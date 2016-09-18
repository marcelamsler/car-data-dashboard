class TripController < ActionController::Base

  def index
    car_id = get_car_id_for_user params[:user_id].to_i

    @trips = Trip.where("car_id = ? AND rpm_mean IS NOT NULL", car_id).map do |trip|
      new_trip = trip.attributes
      new_trip[:engine_cond] = get_color_for_engine(trip.rpm_mean)
      new_trip[:chassis_cond] = get_color_for_chassis(trip.lat_mean)
      new_trip[:brake_cond] = get_color_for_brake(trip.break_mean)
      new_trip[:overall_cond] = get_color_for_overall(trip.rpm_mean, trip.lat_mean, trip.break_mean)
      new_trip
    end

    render json: @trips

  end

  def get_color_for_overall(rpm, lat, brake)
    'green'
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

  def get_color_for_engine (rpm_mean)
    if rpm_mean < 1484
      'green'
    elsif rpm_mean < 1991
      'orange'
    else
      'red'
    end
  end

  def get_color_for_brake (brake_mean)
    if brake_mean < 138
      'green'
    elsif brake_mean < 261
      'orange'
    else
      'red'
    end
  end

  def get_color_for_chassis (lat_mean)
    if lat_mean < 22
      'green'
    elsif lat_mean < 301
      'orange'
    else
      'red'
    end
  end

end
