<?php

namespace App\Http\Controllers\Admin\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;

use App\Models\Tour;

class TourController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (\Gate::allows('isAdmin') || \Gate::allows('isAuthor')) {

            //$list = TouristRoute::latest()->paginate(5);

            $list = DB::table('tours')
                    ->join('tourist_routes','tours.tour_tourist_route','tourist_routes.tr_id')
                    ->leftJoin('promotions','tours.tour_promotion','promotions.prom_id')
                    ->orderBy('tr_id','desc')
                    ->paginate(5);

            // foreach ($list->data as $key => $value) {
            //     # code...
            // }
            return $list;
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $dates = $request['dates'];
        $tour_promotion = $request['tour_promotion'];
        $tour_tourist_route = $request['tour_tourist_route'];
        
        foreach ($dates as $key => $value) {
           $tour = new Tour;
           $tour->tour_code = $tour_tourist_route['tr_id'].date_format(date_create($value),"Ymd");;
           $tour->tour_tourist_route = $tour_tourist_route['tr_id'];
           $tour->tour_time_start = $value;
           $tour->tour_price = $tour_tourist_route['tr_original_price'];
           if(!empty($tour_promotion)){
                $tour->tour_promotion = $tour_promotion['prom_id'];
                $tour->tour_price = $tour->tour_price - $tour->tour_price*$tour_promotion['prom_percent_promotion']/100;
           }
           $tour->save();
        }
        return $request->all();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}