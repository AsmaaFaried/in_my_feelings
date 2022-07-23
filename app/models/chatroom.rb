class Chatroom < ApplicationRecord
    has_many :messages, dependent: :destroy
    has_many :users, through: :messages
    validates :room_name, presence: :true
    validates_uniqueness_of :room_name 


    # belongs_to :user, class_name: 'User'  , :foreign_key => "user1"
    # belongs_to :user, class_name: 'User' , :foreign_key => "user2"    
end
