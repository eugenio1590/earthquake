require 'rails_helper'

RSpec.describe Feature, type: :model do
  describe 'validations' do
    it 'is valid with valid attributes' do
      feature = build(:feature, lat: 40.0, lng: -120.0)
      expect(feature).to be_valid
    end

    it 'is invalid without a title' do
      feature = build(:feature, title: nil)
      expect(feature).not_to be_valid
    end

    it 'is invalid without a place' do
      feature = build(:feature, place: nil)
      expect(feature).not_to be_valid
    end

    it 'is invalid without a url' do
        feature = build(:feature, url: nil)
        expect(feature).not_to be_valid
      end

    it 'is invalid without coordinates' do
      feature = build(:feature, lat: nil, lng: nil)
      expect(feature).not_to be_valid
    end

    it 'is invalid with latitude less than -90.0' do
      feature = build(:feature, lat: -91.0)
      expect(feature).not_to be_valid
      expect(feature.errors[:lat]).to include("must be greater than or equal to -90.0")
    end

    it 'is invalid with latitude greater than 90.0' do
      feature = build(:feature, lat: 91.0)
      expect(feature).not_to be_valid
      expect(feature.errors[:lat]).to include("must be less than or equal to 90.0")
    end

    it 'is invalid with longitude less than -180.0' do
      feature = build(:feature, lng: -181.0)
      expect(feature).not_to be_valid
      expect(feature.errors[:lng]).to include("must be greater than or equal to -180.0")
    end

    it 'is invalid with longitude greater than 180.0' do
      feature = build(:feature, lng: 181.0)
      expect(feature).not_to be_valid
      expect(feature.errors[:lng]).to include("must be less than or equal to 180.0")
    end
  end
end