FactoryBot.define do
  factory :comment do
    content { "MyText" }
    association :feature
  end
end
