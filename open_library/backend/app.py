from datetime import datetime
from models import db, User, Book, Reservation
from formatters import format_user, format_book, format_reservation
from flask_migrate import Migrate
from flask import Flask, request, jsonify
from flask_jwt_extended import create_access_token, JWTManager
from flask_cors import CORS

app = Flask(__name__)

# PostgreSQL configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@db:5432/openlibrary'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] ='eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyNTk4ODAzOSwiaWF0IjoxNzI1OTg4MDM5fQ'

db.init_app(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)
cors = CORS(app)

## USER ROUTES
@app.route('/api/users/register', methods=['POST'])
def register_user():
    data = request.get_json()
    email = data['email']
    password = data['password']
    first_name = data['first_name']
    last_name = data['last_name']

    if db.session.query(User).filter_by(email=email).first():
        return jsonify({"message": "User with this email already exists!"}), 400

    new_user = User(first_name=first_name, last_name=last_name, email=email)
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "user": format_user(new_user),
        "message": "User registered successfully!"
    }), 200

@app.route('/api/users/login', methods=['POST'])
def login_user():
    data = request.get_json()
    email = data['email']
    password = data['password']

    user = db.session.query(User).filter_by(email=email).first()
    if user is None or not user.check_password(password):
        return jsonify({"message": "Invalid email or password!"}), 401

    access_token = create_access_token(identity=user.email)
    return jsonify({
        "token": access_token,
        "user": format_user(user),
        "message": "Logged in successfully!"
    }), 200

@app.route('/api/users/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    try:
        user = User.query.get(user_id)
        if user is None:
            return jsonify({'message': 'User not found'}), 404
        
        # Get reservations
        reservations = [
            {
                'reservation_id': res.reservation_id,
                'user_id': res.user_id,
                'book_id': res.book_id,
                'date': res.date.isoformat(),
            }
            for res in user.reservations
        ]
    
        return jsonify({
            'user_id': user.user_id,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'is_admin': user.is_admin,
            'reservations': reservations
        }), 200
    except Exception as e:
        return jsonify({'message': 'An error occurred', 'error': str(e)}), 500


## BOOK ROUTES
@app.route('/api/books', methods=['POST'])
def create_book():
    data = request.get_json()
    author = data.get('author')
    title = data.get('title')
    description = data.get('description')
    image = data.get('image')
    published = data.get('published')
    in_stock = data.get('in_stock')

    try:
        new_book = Book(
            author=author,
            title=title,
            description=description,
            image=image,
            published=published,
            in_stock=in_stock,
        )
        db.session.add(new_book)
        db.session.commit()
        
        return jsonify({
            'book':format_book(new_book)
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'An error occurred', 'error': str(e)}), 500

@app.route('/api/books', methods=['GET'])   
def get_books():
    try:
        books = Book.query.all()
        books_list = [
            {
                'book_id': book.book_id,
                'author': book.author,
                'title': book.title,
                'description': book.description,
                'published': book.published,
                'image': book.image,
                'in_stock': book.in_stock,
            } for book in books
        ]
        return jsonify(books_list), 200
    except Exception as e:
        return jsonify({'message': 'An error occurred', 'error': str(e)}), 500

@app.route('/api/books/<int:book_id>', methods=['GET'])
def getBookById(book_id):
    try:
        book = Book.query.get(book_id)
        if book is None:
            return jsonify({'message': 'Book not found'}), 404
        
        # Return the appointment details
        return jsonify({
            'book_id': book.book_id,
            'author': book.author,
            'title': book.title,
            'description': book.description,
            'published': book.published,
            'image': book.image,
            'in_stock': book.in_stock,
        }), 200
    except Exception as e:
        return jsonify({'message': 'An error occurred', 'error': str(e)}), 500 

@app.route('/api/books/<int:book_id>/stock', methods=['PATCH'])
def update_books_stock(book_id):
    data = request.get_json()
    new_stock = data.get('new_stock')

    if not new_stock:
        return jsonify({'message': 'Stock is required'}), 400

    if new_stock < 0: 
        return jsonify({'message': 'Stock is less than 0'}), 400

    try:
        book = Book.query.get(book_id)
        if book is None:
            return jsonify({'message': 'Book not found'}), 404
        
        book.in_stock = new_stock
        db.session.commit()
        
        return jsonify({
            'book': {
                'book_id': book.book_id,
                'author': book.author,
                'title': book.title,
                'description': book.description,
                'published': book.published,
                'image': book.image,
                'in_stock': book.in_stock,
            },
            'message': 'Book stock updated successfully!'
        }), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'An error occurred', 'error': str(e)}), 500

## RESERVATION ROUTES
@app.route("/api/reservations", methods=['POST'])
def create_reservation():
    data = request.get_json()
    user_id = data.get('user_id')
    book_id = data.get('book_id')
    date = data.get('date')

    if not user_id or not book_id or not date:
        return jsonify({'message': 'Missing required fields'}), 400

    # Check if the user already has two reservations
    user_reservations_count = Reservation.query.filter_by(user_id=user_id).count()
    if user_reservations_count >= 2:
        return jsonify({'message': 'Already reserved two books'}), 403

    # Check if reservation already exists
    existing_reservation = Reservation.query.filter_by(user_id=user_id, book_id=book_id).first()
    if existing_reservation:
        return jsonify({'message': 'Reservation already exists for this user and book'}), 409

    try:
        new_reservation = Reservation(
            user_id=user_id,
            book_id=book_id,
            date=datetime.fromisoformat(date),
        )
        db.session.add(new_reservation)
        db.session.commit()
        
        return jsonify({
            'reservation':format_reservation(new_reservation)
        }), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'An error occurred', 'error': str(e)}), 500

@app.route("/api/reservations", methods=['GET'])
def get_reservations():
    try:
        reservations = Reservation.query.all()
        reservation_list = [
            {
                'reservation_id': reservation.reservation_id,
                'user_id': reservation.user_id,
                'book_id': reservation.book_id,
                'date': reservation.date,
            } for reservation in reservations
        ]
        return jsonify(reservation_list), 200
    except Exception as e:
        return jsonify({'message': 'An error occurred', 'error': str(e)}), 500

@app.route('/api/reservations/<int:reservation_id>', methods=['DELETE'])
def delete_reservation(reservation_id):
    try:
        reservation = Reservation.query.get(reservation_id)
        if reservation is None:
            return jsonify({'message': 'Reservation not found'}), 404
        
        db.session.delete(reservation)
        db.session.commit()
        
        return jsonify({'message': 'Reservation deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'An error occurred', 'error': str(e)}), 500