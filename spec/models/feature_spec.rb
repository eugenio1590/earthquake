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

    it 'is invalid without a magnitude' do
      feature = build(:feature, magnitude: nil, magnitude_type: nil)
      expect(feature).not_to be_valid
    end

    it 'is invalid without coordinates' do
      feature = build(:feature, lat: nil, lng: nil)
      expect(feature).not_to be_valid
    end

    it 'is invalid with magnitude less than -1.0' do
      feature = build(:feature, magnitude: -2.0)
      expect(feature).not_to be_valid
      expect(feature.errors[:magnitude]).to include("must be greater than or equal to -1.0")
    end

    it 'is invalid with magnitude greater than 10.0' do
      feature = build(:feature, magnitude: 11.0)
      expect(feature).not_to be_valid
      expect(feature.errors[:magnitude]).to include("must be less than or equal to 10.0")
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

  describe ".by_magnitude_type" do
    let!(:feature1) { create(:feature, magnitude_type: :md) }
    let!(:feature2) { create(:feature, magnitude_type: :ml) }
    let!(:feature3) { create(:feature, magnitude_type: :ms) }

    it "returns features with the specified magnitude type" do
      expect(Feature.by_magnitude_type(:md)).to eq([feature1])
    end

    it "returns an empty array if no features with the specified magnitude type exist" do
      expect(Feature.by_magnitude_type(:unknown)).to eq([])
    end

    it "returns features with multiple specified magnitude types" do
      expect(Feature.by_magnitude_type([:md, :ml])).to eq([feature1, feature2])
    end

    it "returns an empty array if no features with any of the specified magnitude types exist" do
      expect(Feature.by_magnitude_type([:unknown1, :unknown2])).to eq([])
    end
  end
end