class CreateChatrooms < ActiveRecord::Migration[6.1]
  def change
    create_table :chatrooms do |t|
      t.string :room_name
      # t.references :user1, foreign_key: {to_table: :users}, null: false 
      # t.references :user2,  foreign_key: {to_table: :users},null: false 
      t.timestamps


      
    end
    # add_foreign_key :chatrooms, :users, column: :user_id1
      # add_foreign_key :chatrooms, :users, column: :user_id2
  end
end
