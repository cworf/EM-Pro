export const venues = {
  the_wilma : {
    name : 'The Wilma',
    website: 'http://thewilmatheater.com',
    physical_address : {
      street: '131 S Higgins Ave',
      street2: '',
      city: 'Missoula',
      state: 'MT',
      zip: '59802',
    },
    contact_info : {
      liaison : 'Bob Sagget',
      phoneNumbers : {
        'Bobs Personal' : '123-123-5432',
        'Front Desk' : '123-123-1234',
        'Booking' : '341-456-2451',
      },
      mailing_address : {
        street: '131 S Higgins Ave',
        street2: '',
        city: 'Missoula',
        state: 'MT',
        zip: '59802',
      },
      emails: [
        'bob@wilma.com',
        'booking@wilma.com',
      ]
    },
    stages: { //new nested collection
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
    },
  },
  caras_park : {
    name : 'Caras Park',
    website: 'http://caraspark.com',
    physicalAddress : {
      street: '123 Carousel Dr',
      street2: '',
      city: 'Missoula',
      state: 'MT',
      zip: '59802',
    },
    contact_info : {
      liaison : 'Vince Vaughan',
      phoneNumbers : {
        'Bobs Personal' : '123-123-5432',
        'Front Desk' : '123-123-1234',
        'Booking' : '341-456-2451',
      },
      mailing_address : {
        street: '123 Carousel Dr',
        street2: '',
        city: 'Missoula',
        state: 'MT',
        zip: '59802',
      },
      emails: [
        'vince@caras.com',
        'vince@wilma.com',
      ]
    },
    stages: { //new nested collection
      gazebo : {
        name: 'Gazeebo',
        type: 'outdoor park',
        roof_type: 'gazebo tent',
        rigging_infrastructure: 'none',
        electrician_available : false,
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
      gazebo2 : {
        name: 'Gazeebo2',
        type: 'outdoor park',
        roof_type: 'gazebo tent',
        rigging_infrastructure: 'none',
        electrician_available : false,
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
    },
  },
}
