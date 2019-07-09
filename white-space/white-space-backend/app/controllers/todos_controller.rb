class TodosController < ApplicationController
  def index
    todos = Todo.all.as_json
    render json: todos
  end

  def create
    todo = Todo.create(name: params[:name], duration: params[:duration], routine_id: params[:routine_id])
    render json: todo
  end

  def destroy
    todo = Todo.find(params[:id])
    todo.destroy
    render json: {message: 'success'}
  end
end
