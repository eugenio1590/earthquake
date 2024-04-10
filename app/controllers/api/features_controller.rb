class Api::FeaturesController < ApplicationController

  def index
    @features = params.key?(:mag_type) ? Feature.by_magnitude_type(params[:mag_type]) : Feature.all
    @features = @features.page(params[:page]).per(params[:per_page] || 10)
    @options = { meta: { pagination: pagination } }
    render json: FeatureSerializer.new(@features, @options).serializable_hash.to_json
  end

  private

  def pagination
    {
      current_page: @features.current_page,
      total: @features.total_count,
      per_page: @features.limit_value
    }
  end
end
