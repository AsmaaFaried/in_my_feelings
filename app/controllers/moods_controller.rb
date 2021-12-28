class MoodsController < ApplicationController
 skip_before_action :authorize
 def index 
  moods=Mood.all
  render json: moods
 end

 def show
  mood=Mood.find(params[:id])
  respond_to do |format|
    format.html
    format.json {render :json=>mood.to_json}
  end
 end
end
