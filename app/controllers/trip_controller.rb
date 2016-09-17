class TripController < ActionController::Base

  def index
    car_id = get_car_id_for_user params[:user_id]

    @trip = Trip.find_by(car_id: car_id)

    render json: @trip
  end

  def show
    car_id = get_car_id_for_user params[:user_id]
    @trip = Trip.find_by(car_id: car_id, id: params[:id])
    render json: @trip
  end

  def get_car_id_for_user (user_id)
    if user_id == 1
      87
    else
      10
    end
  end

end
