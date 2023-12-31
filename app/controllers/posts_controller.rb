class PostsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_unproccesable_entity
    skip_before_action :authorized, only: :index
        wrap_parameters format: []
        
        def create
            post = Post.create!(question: params[:question])
            post.responses = []
            render json: post, status: :created
        end
        
        def index
            posts = Post.all
            if posts.count > 0
                render json: posts
            else
                render json: {error:"There are currently no Discussions."}, status: 404
            end
            
        end
        private
    
        def render_unproccesable_entity invalid
            render json: {errors: invalid.record.errors.full_messages}, status: 422
        end
    end