class UserController < ActionController::Base

  def show
    car_id = get_car_id_for_user params[:id]



    @data = []
    ##Return data for overview and dashboard

    render json: @data
  end

  def get_car_id_for_user (user_id)
    if user_id == 1
      87
    else
      10
    end
  end


end
