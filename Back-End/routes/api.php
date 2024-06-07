<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LevelController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SignalController;
use App\Http\Controllers\SubCategoryController;
use App\Http\Controllers\TutorialController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/test-csnrf', function () {
    return response()->json(['csrf' => csrf_token()]);
});

Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);
Route::post('/add-signals', [SignalController::class, 'store']);
Route::post('/confirm-signal/{signal_id}', [SignalController::class, 'confirm']);
Route::post('/tutorials/{id}/like', [LikeController::class, 'likeTutorial']);
Route::get('/tutorials/likes', [LikeController::class, 'getLikes']);



Route::post('/confirm-signal/{signal_id}', [SignalController::class, 'confirm']);


Route::get('/user',[UserController::class,"getUserData"]);
Route::get('/get-users', [UserController::class, 'index']);
Route::get('/get-levels', [LevelController::class, 'index']);
Route::get('/get-roles', [RoleController::class, 'index']);
Route::get('/get-categories', [CategoryController::class, 'index']);
Route::get('/get-tutorials', [TutorialController::class, 'index']);
Route::get('/get-signals', [SignalController::class, 'index']);

Route::post('/tutorials/{id}/comments', [CommentController::class, 'store']);
Route::get('/tutorials/comments', [CommentController::class, 'index']);
// Route::post('/add-user', [UserController::class, 'store']);
// In api.php



Route::apiResources([
    'add-user' => UserController::class ,
    'add-tutorial' => TutorialController::class ,
    'add-category' =>CategoryController::class,
    'add-subcategory' =>SubCategoryController::class,

]);



Route::put('/users/update-user/{user}', [UserController::class, 'update']);
Route::put('/tutorials/update-tutorial/{tutorialId}', [TutorialController::class, 'update']);
Route::put('/category/update-category/{CategoryId}', [CategoryController::class, 'update']);
Route::put('/subcategory/update-subcategory/{CategoryId}', [SubCategoryController::class, 'update']);
Route::put('/category/update-picture/{id}', [CategoryController::class, 'updatePicture']);





