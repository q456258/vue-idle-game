
export const dungeon = {
    methods: {
        generateDungeon(type, count) {
            var map = [];
            // normal, elite, chest, boss
            var types = ['normal', 'elite', 'chest', 'boss']
            var img = ['normal', 'elite', 'chest', 'boss']
            var probability = [0.7, 0.85, 0.95, 1];
            for(var i=0; i<count; i++) {
                let temp = []
                for(var j=0; j<3; j++) {
                    let choice = {};
                    let random = Math.random();
                    for(var k=0; k<probability.length; k++) {
                        if(random <= probability[k]) {
                            choice = {type: types[k], img: './icons/'+img[k]+'.png'};
                            break;
                        }
                    }
                    temp.push(choice);
                }
                map.push(temp);
            }
            if(type == 'trial') {
                map[4] = [
                    {type: 'elite', img: './icons/elite.png'},
                    {type: 'elite', img: './icons/elite.png'},
                    {type: 'elite', img: './icons/elite.png'},
                ]
                map[9] = [
                    {type: 'elite', img: './icons/elite.png'},
                    {type: 'elite', img: './icons/elite.png'},
                    {type: 'elite', img: './icons/elite.png'},
                ]
                map[14] = [
                    {type: 'elite', img: './icons/elite.png'},
                    {type: 'elite', img: './icons/elite.png'},
                    {type: 'elite', img: './icons/elite.png'},
                ]
                map[19] = [
                    {type: 'boss', img: './icons/boss.png'},
                    {type: 'boss', img: './icons/boss.png'},
                    {type: 'boss', img: './icons/boss.png'},
                ]
            }
            return map;
        }
    }
}