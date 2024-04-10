require 'rails_helper'

RSpec.describe "Api::Comments", type: :request do
  describe "POST /api/features/:feature_id/comments" do
    let(:feature) { create(:feature) }

    context "with valid parameters" do
      it "creates a new comment" do
        post "/api/features/#{feature.id}/comments", params: { body: "Test comment" }, as: :json
        
        expect(response).to have_http_status(:no_content)
      end
    end

    context "with invalid parameters" do
      it "returns errors" do
        post "/api/features/#{feature.id}/comments", params: { body: "" }, as: :json
        
        expect(response).to have_http_status(:unprocessable_entity)
        expect(JSON.parse(response.body)['errors']).to include("Content can't be blank")
      end
    end
  end
end
