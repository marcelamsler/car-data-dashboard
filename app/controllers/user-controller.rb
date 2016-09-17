class UserController < ActionController::Base

  def show
    car_id = get_car_id_for_user params[:id]



    @data = [

        {
            "RPMGreenTop": 1484,
            "RPMOrangeTop": 1991,
            "RPMRedTop": 2498,

            "BreakGreenTop": 138,
            "BreakOrangeTop": 261,
            "BreakRedTop": 399,

            "AccelGreenTop": 151,
            "AccelOrangeTop": 252,
            "AccelRedTop": 353,

            "LatGreenTop": 22,
            "LatOrangeTop": 301,
            "LatRedTop": 582,

            "RPMCar": 3,
            "BrakeCar": 5,
            "AccelCar": 7,
            "LatCar": 9

        }

    ]
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
