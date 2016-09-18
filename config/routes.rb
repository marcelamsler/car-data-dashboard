Rails.application.routes.draw do

  resources :user do
    resources :trip
    member do
      get :certificate
    end
  end

  get '/import-data', to: 'data_import#import'

  get '/', to: 'static_pages#home'
  get 'static_pages/trips'
  get 'static_pages/trip_detail'

  get '/updateAgg', to: 'data_import#update'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
