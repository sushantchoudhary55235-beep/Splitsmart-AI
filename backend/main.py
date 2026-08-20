from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from pwdlib import PasswordHash
from jose import jwt, JWTError
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from database import SessionLocal,Base, engine
from models import User, Group, GroupMember, Expense, ExpenseParticipant
from schemas import (
    UserCreate,
    UserResponse,
    UserLogin,
    GroupCreate,
    GroupResponse,
    ExpenseCreate,
    ExpenseResponse,
    GroupMemberCreate,
    GroupMemberResponse,
    ExpenseParticipantCreate,
    ExpenseParticipantResponse
)


app = FastAPI()
Base.metadata.create_all(bind=engine)

password_hash = PasswordHash.recommended()
SECRET_KEY = "splitsmart-secret-key-change-later"
ALGORITHM = "HS256"
security = HTTPBearer()


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    token = credentials.credentials

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        user_id = payload.get("user_id")

        if user_id is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid token"
            )

    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

    user = db.query(User).filter(User.id == user_id).first()

    if user is None:
        raise HTTPException(
            status_code=401,
            detail="User not found"
        )

    return user

@app.get("/")
def root():
    return {
        "message": "SplitSmart API is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    hashed_password = password_hash.hash(user.password)

    new_user = User(
        name=user.name,
        email=user.email,
        password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

@app.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not existing_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not password_hash.verify(
        user.password,
        existing_user.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    token = jwt.encode(
        {
            "user_id": existing_user.id,
            "email": existing_user.email
        },
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return {
        "message": "Login successful",
        "access_token": token,
        "user": {
            "id": existing_user.id,
            "name": existing_user.name,
            "email": existing_user.email
        }
    }

@app.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user

@app.post("/groups", response_model=GroupResponse)
def create_group(
    group: GroupCreate,
    db: Session = Depends(get_db)
):
    new_group = Group(
        name=group.name
    )

    db.add(new_group)
    db.commit()
    db.refresh(new_group)

    return new_group

@app.get("/groups", response_model=list[GroupResponse])
def get_groups(
    db: Session = Depends(get_db)
):
    return db.query(Group).all()

@app.post("/expenses", response_model=ExpenseResponse)
def create_expense(
    expense: ExpenseCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    new_expense = Expense(
        description=expense.description,
        amount=expense.amount,
        payer_id=current_user.id,
        group_id=expense.group_id
    )

    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)

    return new_expense

@app.get("/expenses", response_model=list[ExpenseResponse])
def get_expenses(
    db: Session = Depends(get_db)
):
    return db.query(Expense).all()

@app.post(
    "/groups/{group_id}/members",
    response_model=GroupMemberResponse
)
def add_group_member(
    group_id: int,
    member: GroupMemberCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Check whether group exists
    group = db.query(Group).filter(Group.id == group_id).first()

    if group is None:
        raise HTTPException(
            status_code=404,
            detail="Group not found"
        )

    # Check whether user exists
    user = db.query(User).filter(User.id == member.user_id).first()

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    # Check whether user is already a member
    existing_member = db.query(GroupMember).filter(
        GroupMember.group_id == group_id,
        GroupMember.user_id == member.user_id
    ).first()

    if existing_member:
        raise HTTPException(
            status_code=400,
            detail="User is already a member of this group"
        )

    new_member = GroupMember(
        group_id=group_id,
        user_id=member.user_id
    )

    db.add(new_member)
    db.commit()
    db.refresh(new_member)

    return new_member

@app.get(
    "/groups/{group_id}/members"
)
def get_group_members(
    group_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    group = db.query(Group).filter(Group.id == group_id).first()

    if group is None:
        raise HTTPException(
            status_code=404,
            detail="Group not found"
        )

    members = db.query(GroupMember).filter(
        GroupMember.group_id == group_id
    ).all()

    result = []

    for member in members:
        result.append({
            "id": member.id,
            "user_id": member.user_id,
            "name": member.user.name,
            "email": member.user.email
        })

    return result

@app.post(
    "/expenses/{expense_id}/participants",
    response_model=ExpenseParticipantResponse
)
def add_expense_participant(
    expense_id: int,
    participant: ExpenseParticipantCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Check whether expense exists
    expense = db.query(Expense).filter(
        Expense.id == expense_id
    ).first()

    if expense is None:
        raise HTTPException(
            status_code=404,
            detail="Expense not found"
        )

    # Check whether user exists
    user = db.query(User).filter(
        User.id == participant.user_id
    ).first()

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    # Check whether participant already exists
    existing_participant = db.query(
        ExpenseParticipant
    ).filter(
        ExpenseParticipant.expense_id == expense_id,
        ExpenseParticipant.user_id == participant.user_id
    ).first()

    if existing_participant:
        raise HTTPException(
            status_code=400,
            detail="User is already a participant"
        )

    new_participant = ExpenseParticipant(
        expense_id=expense_id,
        user_id=participant.user_id,
        share=participant.share
    )

    db.add(new_participant)
    db.commit()
    db.refresh(new_participant)

    return new_participant

@app.get(
    "/expenses/{expense_id}/participants",
    response_model=list[ExpenseParticipantResponse]
)
def get_expense_participants(
    expense_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    expense = db.query(Expense).filter(
        Expense.id == expense_id
    ).first()

    if expense is None:
        raise HTTPException(
            status_code=404,
            detail="Expense not found"
        )

    return db.query(ExpenseParticipant).filter(
        ExpenseParticipant.expense_id == expense_id
    ).all()

@app.put(
    "/expenses/{expense_id}/participants/{participant_id}",
    response_model=ExpenseParticipantResponse
)
def update_expense_participant(
    expense_id: int,
    participant_id: int,
    participant: ExpenseParticipantCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    existing_participant = db.query(
        ExpenseParticipant
    ).filter(
        ExpenseParticipant.id == participant_id,
        ExpenseParticipant.expense_id == expense_id
    ).first()

    if existing_participant is None:
        raise HTTPException(
            status_code=404,
            detail="Participant not found"
        )

    existing_participant.share = participant.share

    db.commit()
    db.refresh(existing_participant)

    return existing_participant

@app.put(
    "/expenses/{expense_id}/participants/{participant_id}",
    response_model=ExpenseParticipantResponse
)
@app.get("/groups/{group_id}/balances")
def get_group_balances(
    group_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Check whether group exists
    group = db.query(Group).filter(
        Group.id == group_id
    ).first()

    if group is None:
        raise HTTPException(
            status_code=404,
            detail="Group not found"
        )

    # Get all expenses in this group
    expenses = db.query(Expense).filter(
        Expense.group_id == group_id
    ).all()

    # Store net balance for every user
    balances = {}

    for expense in expenses:

        # Payer gets credit for the full amount
        balances[expense.payer_id] = (
            balances.get(expense.payer_id, 0)
            + expense.amount
        )

        # Participants owe their respective shares
        participants = db.query(ExpenseParticipant).filter(
            ExpenseParticipant.expense_id == expense.id
        ).all()

        for participant in participants:

            balances[participant.user_id] = (
                balances.get(participant.user_id, 0)
                - participant.share
            )

    # Separate people who owe money and people who should receive money
    debtors = []
    creditors = []

    for user_id, balance in balances.items():

        balance = round(balance, 2)

        if balance < 0:
            debtors.append({
                "user_id": user_id,
                "amount": round(-balance, 2)
            })

        elif balance > 0:
            creditors.append({
                "user_id": user_id,
                "amount": round(balance, 2)
            })

    # Create settlement transactions
    settlements = []

    i = 0
    j = 0

    while i < len(debtors) and j < len(creditors):

        debtor = debtors[i]
        creditor = creditors[j]

        amount = min(
            debtor["amount"],
            creditor["amount"]
        )

        settlements.append({
            "from_user": debtor["user_id"],
            "to_user": creditor["user_id"],
            "amount": round(amount, 2)
        })

        debtor["amount"] = round(
            debtor["amount"] - amount,
            2
        )

        creditor["amount"] = round(
            creditor["amount"] - amount,
            2
        )

        if debtor["amount"] == 0:
            i += 1

        if creditor["amount"] == 0:
            j += 1

    return settlements