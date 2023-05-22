from .db import db, environment, SCHEMA, add_prefix_for_prod

class ReviewImage(db.Model):
    __tablename__ = 'reviewImages'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String, nullable=False)
    review_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('reviews.id')), nullable=False)

    review = db.relationship('Review', back_populates='review_images')


    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url
        }
