export default {
  main_stage : {
    name: 'Main Stage',
    type: 'indoor theater',
    roof_type: 'Plain ol\' roof',
    rigging_infrastructure: 'upstage truss, downstage truss, etc etc',
    electrician_available : true,
    dimensions: {
      depth: 30,
      upstage_width: 60,
      downstage_width: 60,
      upstage_height: 45,
      downstage_height: 45,
      coverage_area_width: 80,
      coverage_area_depth: 150,
    },
    power: [
      {
        amps : 50,
        volts : 220,
        qty : 1,
        type : 'Dryer Plug',
        location : 'Behind Stage',
        notes : 'here are some notes about this shit',
      },
      {
        amps : 100,
        volts : 220,
        qty : 1,
        type : 'mini cam',
        location : 'behind stage',
        notes : 'here are other notes',
      },
    ],
  },
}
