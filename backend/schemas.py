from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr

    class Config:
        from_attributes = True
class UserLogin(BaseModel):
    email: EmailStr
    password: str

class GroupCreate(BaseModel):
    name: str


class GroupResponse(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True

class ExpenseCreate(BaseModel):
    description: str
    amount: float
    group_id:int


class ExpenseResponse(BaseModel):
    id: int
    description: str
    amount: float
    payer_id: int | None
    group_id: int | None

    class Config:
        from_attributes = True

class GroupMemberCreate(BaseModel):
    user_id: int
    group_id: int


class GroupMemberResponse(BaseModel):
    id: int
    user_id: int
    group_id: int

    class Config:
        from_attributes = True

class ExpenseParticipantCreate(BaseModel):
    user_id: int
    share: float


class ExpenseParticipantResponse(BaseModel):
    id: int
    expense_id: int
    user_id: int
    share: float

    class Config:
        from_attributes = True