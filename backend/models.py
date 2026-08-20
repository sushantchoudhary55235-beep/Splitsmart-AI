from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    password = Column(String, nullable=False)

    expenses = relationship("Expense", back_populates="payer")
    group_memberships = relationship("GroupMember", back_populates="user")
    expense_participations = relationship(
        "ExpenseParticipant",
        back_populates="user"
    )


class Group(Base):
    __tablename__ = "groups"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)

    members = relationship("GroupMember", back_populates="group")
    expenses = relationship("Expense", back_populates="group")


class GroupMember(Base):
    __tablename__ = "group_members"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    group_id = Column(
        Integer,
        ForeignKey("groups.id"),
        nullable=False
    )

    user = relationship("User", back_populates="group_memberships")
    group = relationship("Group", back_populates="members")


class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index=True)

    description = Column(String, nullable=False)

    amount = Column(Float, nullable=False)

    payer_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    group_id = Column(
        Integer,
        ForeignKey("groups.id"),
        nullable=False
    )

    payer = relationship("User", back_populates="expenses")
    group = relationship("Group", back_populates="expenses")

    participants = relationship(
        "ExpenseParticipant",
        back_populates="expense"
    )


class ExpenseParticipant(Base):
    __tablename__ = "expense_participants"

    id = Column(Integer, primary_key=True, index=True)

    expense_id = Column(
        Integer,
        ForeignKey("expenses.id"),
        nullable=False
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    share = Column(Float, nullable=False)

    expense = relationship(
        "Expense",
        back_populates="participants"
    )

    user = relationship(
        "User",
        back_populates="expense_participations"
    )