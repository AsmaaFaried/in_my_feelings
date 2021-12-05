class MessagesController < ApplicationController

    def index 
        messages=Message.all
        render json: messages, include: :user, status: :ok

    end

    def create
        message=Message.create(message_params)
        chatroom= Chatroom.find(message_params[:chatroom_id])
        # instantiate new serializer instances manually. because we are using websockets 
        if message.save
            serialized_data=ActiveModelSerializers::Adapter::Json.new(
                MessageSerializer.new(message)
            ).serializable_hash
            MessagesChannel.broadcast_to chatroom, serialized_data
            head :ok
        end
    end

    def destroy 
        message=Message.find_by(id: params[:message_id])
        message.delete 
        head :no_content
    end

    private

    def messages_params
        params.permit(:message_body,:user_id,:chatroom_id)
    end
end
