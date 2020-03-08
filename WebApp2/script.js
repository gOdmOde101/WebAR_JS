window.onload = () => 
{
    const button = document.querySelector('button[data-action="change"]');//1
    button.innerText = '﹖';//2

    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() 
{
    return [
        {
            name: 'Characters',
            location: {
                lat: 85.311387,
                lng: 23.406480,
            },
        },
    ];
}

var models = [//3
    {
        url: './asset/sims_diamond/scene.gltf',
        scale: '0.4 0.4 0.4',
        rotation: '0 200 0',
        info: 'Active Sim, Lv. 22',
        position="20 8 80",
    },
    {
        url: './asset/beedrill/scene.gltf',
        scale: '0.4 0.4 0.4',
        info: 'Beedrill, Lv. 2, HP 20/8',
        rotation: '0 200 0',
        position="20 8 80",
    },
    {
        url: './asset/drone_tri-copter/scene.gltf',
        scale: '0.5 0.5 0.5',
        rotation: '0 180 0',
        info: 'Spy-Copter, Lv. 3, HP 150/150',
        position="20 8 80"
    },
];//3

var modelIndex = 0;//4

var setModel = function (model, entity) //5
{
    if (model.scale) 
    {
        entity.setAttribute('scale', model.scale);
    }

    if (model.rotation) 
    {
        entity.setAttribute('rotation', model.rotation);
    }

    if (model.position) 
    {
        entity.setAttribute('position', model.position);
    }

    entity.setAttribute('gltf-model', model.url);

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
};//5

function renderPlaces(places) 
{
    let scene = document.querySelector('a-scene');

    places.forEach((place) => 
    {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setModel(models[modelIndex],model);//6

        model.setAttribute('animation-mixer', '');
        
        document.querySelector('button[data-action="change"]').addEventListener('click', function () 
        {
            var entity = document.querySelector('[gps-entity-place]');
            modelIndex++;
            var newIndex = modelIndex % models.length;
            setModel(models[newIndex], entity);
        });
        scene.appendChild(model);
    }
    );
}