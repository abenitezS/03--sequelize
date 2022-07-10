const { Router, response } = require('express');
const { Op, Character, Role } = require('../db');
const router = Router();

router.post('/', async (req, res) => {
    // Debe recibir por body los datos del modelo de Character y crear una instancia del mismo en la base de datos.
    // De no recibir todos los parámetros necesarios debería devolver un status 404 con el mensaje "Falta enviar datos obligatorios"
    // Si alguna validación interna de la base de datos falle debe devolver un status 404 con el mensaje "Error en alguno de los datos provistos"
    // Si todos los datos son provistos debera devolver un status 201 y el objeto del personaje
  // Tu código acá:
  const { code, name, hp, mana } = req.body;
        if (!code || !name || !hp || !mana ) return res.status(404).send('Falta enviar datos obligatorios')
  try {   
         
      const newCharacter = await Character.create(req.body);
      res.status(201).json(newCharacter);
    } catch (error) {
        res.status(404).send("Error en alguno de los datos provistos");;
    }
  });

  router.get('/', async (req, res) => {
  
      const {race,age}=req.query
      const condition={}
      const where={}
      if (race) where.race=race;
      if (age) where.age=age;
      condition.where=where
      const chars= await Character.findAll(condition);
      res.json(chars);
    }
  );

router.get('/young', async (req, res) => {
  const result = await Character.findAll({
    where: {age :{ [Op.lt]: 25 }
      }
    });
   res.json(result);
})  


router.get('/roles/:code', async (req, res) => {
  const { code } = req.params;
  const character = await Character.findByPk(code, {
    include : Role  //me incluye en el modelo la relacion 
  });
 
  res.json(character);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const character = await Character.findByPk(id);
  // console.log('Skill: ', player.skill); // Getter
  if(!character) return res.status(404).send(`El código ${id} no corresponde a un personaje existente`)
  res.json(character);
});

//lo pongo arriba del /:idAtribute porque sino no lo va a tomar 
router.put('/addAbilities', async function(req, res) {
  const { codeCharacter , abilities }= req.body;
  const character = await Character.findByPk(codeCharacter);
  const promises= abilities.map(a=>character.createAbility(a))
  await Promise.all(promises);
  res.send('ok')
 
 });


// {
//   codeCharacter: 'TWO',
//   abilities: [
//     { name: 'abilityOne', mana_cost: 17.0 },
//     { name: 'abilityTwo', mana_cost: 84.0 },
//     { name: 'abilityThree', mana_cost: 23.0 }
//   ]
// }


router.put('/:attribute', async(req,res)=>{
  const {attribute}=req.params;
  const {value}=req.query;
  await Character.update({ [attribute]: value},{
    where: {
      [attribute]:null
    }
  })
  res.send('Personajes actualizados')
})





 
 



module.exports = router;