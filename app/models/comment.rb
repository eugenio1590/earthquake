class Comment < ApplicationRecord
  belongs_to :feature

  validates :content, presence: true
end
