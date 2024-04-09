require 'rails_helper'

RSpec.describe "Api::Features", type: :request do
  describe "GET /api/features" do
    let!(:features) { create_list(:feature, 5) }

    it "returns a successful response" do
      get "/api/features"
      expect(response).to have_http_status(:success)
    end

    it "returns features with pagination meta" do
      get "/api/features"
      parsed_response = JSON.parse(response.body)
      expect(parsed_response["data"]).not_to be_empty
      expect(parsed_response["meta"]).not_to be_empty
      expect(parsed_response["meta"]).to include("pagination")
      expect(parsed_response["meta"]["pagination"]).not_to be_empty
      expect(parsed_response["meta"]["pagination"]).to include(
        "current_page",
        "total",
        "per_page"
      )
    end
  end
end
