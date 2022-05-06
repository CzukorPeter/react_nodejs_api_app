// knes queries
const knex = require('knex');
const config = require('../knexfile');
const db = knex(config.development);

//settlements
//settlement
//partners
//partner

module.exports = {
    addSettlement,
    findSettlements,
    findSettlementById,
    removeSettlementById,
    updateSettlementById,
    findSettlementPartners,


    addPartner,
    findPartners,
    findPartnerById,
};

async function addSettlement(settlement) {
  const [id] = await db('settlements').insert(settlement);
  return findSettlementById(id);
}

function findSettlements(){
    return db('settlements');
}

function findSettlementById(id){
    return db('settlements')
    .where({ id })
    .first();
}

function removeSettlementById(id){
    return db('settlements')
    .where({ id })
    .del();
}

function updateSettlementById(id, changes){
    return db('settlements')
    .where({ id })
    .update(changes)
    .then(() => {
        return findSettlementById(id);
    });
}



async function addPartner(partner, settlement_id) {
  const [id] = await db('partners')
  .where({ settlement_id })
  .insert(partner);
  return findPartnerById(id);
}

function findPartners(){
    return db('partners as p')
    .join("settlements as s", "s.id", "p.settlement_id")
    .select(
      "p.id",
      "p.name",
      "s.id as settlementsID",
      "s.name as settlementsName"
    )
    //.orderBy('p.name', 'asc')
    ;
}


function findPartnerById(id) {
  return db('partners')
  .where({id})
  .first();
}



function findSettlementPartners(settlement_id) {
    return db("settlements as s")
      .join("partners as p", "s.id", "p.settlement_id")
      .select(
        "s.id as settlementsID",
        "s.name as settlementsName",
        "p.id as partnerID",
        "p.name as partnerName"
      )
      .where({ settlement_id });
  }
  
  