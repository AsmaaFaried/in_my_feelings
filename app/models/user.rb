class User < ApplicationRecord
    has_many :messages, dependent: :destroy
    # has_many :user2_chatrooms, class_name: 'Chatroom',foreign_key: 'user2'
    has_many :chatrooms, through: :messages
    validates :name, :username,:has_agreed, presence: :true
    validates_uniqueness_of :username
    has_secure_password



    # has_many :user1_chatrooms, class_name: 'Chatroom', foreign_key: 'user1'#, through: :messages
    # has_many :user2_chatrooms, class_name: 'Chatroom',foreign_key: 'user2'#, through: :messages

end
 