const { Ability } = require('../db');;

const router = require('express').Router();

router.post('/', async function(req, res) {
 const { name , mana_cost}= req.body;
 if (!name || !mana_cost) return res.status(404).send('Falta enviar datos obligatorios')
 try{
     const ability = await Ability.create(req.body);
     res.status(201).json(ability)
 } catch(error) {
    res.status(404).send('Error en data')
 }

});

router.put('/setCharacter', async function(req, res) {
    const { idAbility , codeCharacter }= req.body;
   // if (!idAbility || !codeCharacter) return res.status(404).send('Falta enviar datos obligatorios')
   
        const ability = await Ability.findByPk(idAbility);
        await ability.setCharacter(codeCharacter);
        res.json(ability)
    
   
   });





module.exports = router;