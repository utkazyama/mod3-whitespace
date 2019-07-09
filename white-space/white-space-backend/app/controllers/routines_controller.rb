class RoutinesController < ApplicationController
  def index
    routines = Routine.all.as_json(include: :todos)
    render json: routines
  end

  def create
    routine = Routine.create(title: params[:title])
    render json: routine
  end

  def destroy
    routine = Routine.find(params[:id])
    routine.destroy
    render json: {message: 'success'}
  end

end
