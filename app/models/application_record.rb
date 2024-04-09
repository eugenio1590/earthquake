class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  paginates_per 10
  max_paginates_per 1000
end
