def format_user(user):
    return {
        "user_id": user.user_id,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "email": user.email,
        "is_admin": user.is_admin
    }

def format_book(book): 
    return {
        "book_id": book.book_id,
        "author": book.author,
        "title": book.title,
        "description": book.description,
        "image": book.image,
        "published": book.published,
        "in_stock": book.in_stock,
    }

def format_reservation(reservation):
    return {
        "reservation_id": reservation.reservation_id,
        "user_id": reservation.user_id,
        "book_id": reservation.book_id,
        "date": reservation.date,
    }