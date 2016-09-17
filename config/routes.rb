Rails.application.routes.draw do
  get '/import-data', to: 'data_import#import'

  get 'static_pages/home'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
