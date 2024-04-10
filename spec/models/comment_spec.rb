require 'rails_helper'

RSpec.describe Comment, type: :model do
  context "validations" do
    it "is invalid without content" do
      comment = build(:comment, content: nil)
      expect(comment).to be_invalid
    end

    it "is valid with content" do
      comment = build(:comment)
      expect(comment).to be_valid
    end
  end
end
