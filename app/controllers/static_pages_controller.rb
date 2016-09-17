class StaticPagesController < ActionController::Base
  protect_from_forgery with: :exception
  def home
    render :home, layout: 'application'
  end
end
