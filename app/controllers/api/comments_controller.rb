class Api::CommentsController < ApplicationController

  def create
    @feature = Feature.find(params[:feature_id])
    @comment = @feature.comments.build(content: params[:body])

    if @comment.save
      head :no_content
    else
      render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
end
