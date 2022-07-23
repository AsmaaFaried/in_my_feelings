class ChatroomsController < ApplicationController
  before_action :authorize

  def index
    current_user = User.find(session[:user_id])
    chatrooms = current_user.chatrooms.uniq
    render json: {
             chatrooms: chatrooms,
           }
  end

  def show
    chatroom = Chatroom.find(params[:id])
    render json: ChatroomSerializer.new(chatroom).serialized_json
  end
  
  # def get_room
  #   @id1 = session[:user_id]
  #   @id2 = params[:id]
  #   @room = find_room(@id1,@id2)

  #   if @room
  #     render json: {
  #       room: @room,
  #     }
  #   else
  #       @new_room = Chatroom.new(room_name:"priv_#{@id1}_#{@id2}",is_private: true)

  #       if @new_room.save
  #         # RoomUser.create(id1:@id1, id2:@id2,room_id:@new_room.id)
  #       end
        
  #   end

  # end
  private

  def chatroom_params
    params.permit(:room_name)
  end
  # def find_room(uid1,uid2)
  #   @room = RoomUser.where((id1==uid1 AND id2==uid2) OR (id1==uid2 AND id2==uid1) )
  # end
end