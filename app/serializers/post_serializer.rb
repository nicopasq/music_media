class PostSerializer < ActiveModel::Serializer
  has_many :responses
  attributes :id, :question
end