Rails.application.routes.draw do
  resources :jobs
  devise_for :users,
  path: '',
  controllers: {
    registrations: 'users/registrations',
    sessions: 'users/sessions',
  },
  path_names: {
    sign_in: 'login',
    password: 'forgot',
    confirmation: 'confirm',
    sign_up: 'sign_up',
    sign_out: 'signout'
  }

  get 'dashboard/show'
  get "up" => "rails/health#show", as: :rails_health_check

  authenticated :user do
    root to: 'dashboard#show', as: :user_root
  end

  devise_scope :user do
    root to: 'devise/sessions#new'
  end
end
