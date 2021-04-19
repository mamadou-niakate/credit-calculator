import React, {useState, useEffect} from 'react'
import Echeances from './Echeances'
import { Grid,Input,Paper } from '@material-ui/core';

function Simulator() {
    const [inputs,setInput] = useState({amount:0,year:2,rate:0});
    const [amortissements,setAmortissement] = useState([]);
    
    let calculMensualite = (montant, tauxMensuel, mois) => {
        let remboursementMensuel;
        if (tauxMensuel) {
            remboursementMensuel = montant * tauxMensuel /
            (1 - (Math.pow(1 / (1 + tauxMensuel), mois)));
        } else {
            remboursementMensuel = montant / mois;
        }

        return remboursementMensuel;

    }

    let calculAmortissement = (montant, tauxMensuel, mois, annee) => {
        let remboursementMensuel = calculMensualite(montant, tauxMensuel, mois);
        let balance = montant; // total
        let amortissementY = [];
        let amortissementM = [];
        for (let y=0; y<annee; y++) {
            let interestY = 0;  //Interest payment for year y
            let montantY = 0; //montant payment for year y
            for (let m=0; m<12; m++) {
                let interestM = balance * tauxMensuel;       //Interest payment for month m
                let montantM = remboursementMensuel - interestM; //montant payment for month m
                interestY = interestY + interestM;
                montantY = montantY + montantM;
                balance = balance - montantM;
                amortissementM.push({remboursementMensuel, capitalAmorti:montantM, interet:interestM, capitalRestantDu : balance});
            }
            amortissementY.push({remboursementMensuel, capitalAmorti:montantY, interet:interestY, capitalRestantDu : balance});
        }
        
        return {remboursementMensuel, amortissementY , amortissementM};
    };

    const onChangeInput = e => {
        const newData = {...inputs, [e.target.name]: e.target.value};
        setInput(newData);
    }


    useEffect(() => {
        const {amount,year,rate} = inputs;
        let {amortissementM} = calculAmortissement(parseFloat(amount),parseFloat(rate)/100/12,year*12,year);
        setAmortissement(amortissementM)
    }, [inputs])

    return (
        <div>
            <form noValidate autoComplete="off">
                <Paper style={{ padding: 16 }}>
                    <Grid container justify="center" spacing={2} >
                        <Grid item>
                            <Input type="text" name="amount"  value={inputs.amount} onChange={onChangeInput} placeholder="Montant"/>
                        </Grid>
                         <Grid item>
                            <Input type="number" name="year" value={inputs.year} onChange={onChangeInput} placeholder="Année"/>
                        </Grid>
                         <Grid item>
                            <Input type="number" name="rate" value={inputs.rate} onChange={onChangeInput} placeholder="Taux"/>
                        </Grid>
                    </Grid>
                </Paper>
            </form>
            <Echeances data={amortissements}/>
        </div>
    )
}

export default Simulator
