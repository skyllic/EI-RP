import { ExponentialCost, FirstFreeCost, LinearCost } from "../api/Costs";
import { Localization } from "../api/Localization";
import { BigNumber, parseBigNumber } from "../api/BigNumber";
import { theory } from "../api/Theory";
import { Utils } from "../api/Utils";
import { FreeCost } from "../TheorySDK.Win.1.4.22/api/Costs";

var id = "T9-Dilemmas"
var name = "Dilemmas (beta version)";
var description = "Additional lemmas similar to ones in Theory 9. These 'dilemmas' are designed to be approximately" +
" 10 minutes long. There are 5 difficulty levels; \n Easy, Normal, Core, Hard, 'Hax'. \n\n"
+ "Difficulties higher than normal are designed to be more mechanically demanding than the lemmas in theory 9. \n\n"
+ "In particular, 'Hax' difficulty is designed to be particularly challenging! It is highly recommended to be able to"
+ " comfortably do a difficulty before moving on to the next one.";
var authors = "Playspout";
var version = 0.3;

var c11, c12, c13;
var c21, c22, c23, c24, c25;
var c31, c32, c33;
var c41, c42, c43, c44;
var q51, q52, c51, c52, c53, c54, c55, c56, c57, c58;
var q61, q62, c61, c62, c63, c64;
var q71, q72, c71, c72;
var lemma;
var difficultySelectUpgrade;
var dilemmaSelectUpgrade;
var difficultySelectFlag;
var dilemmaSelectFlag;
var resetStageFlag;
var hiscoreUpgrade;

var difficulty = 2;

var numberOfDilemmas = 3;
var bestTimes = [
    [9999, 9999, 9999, 9999, 9999],
    [9999, 9999, 9999, 9999, 9999],
    [9999, 9999, 9999, 9999, 9999],
    [9999, 9999, 9999, 9999, 9999],
    [9999, 9999, 9999, 9999, 9999],
    [9999, 9999, 9999, 9999, 9999],
    [9999, 9999, 9999, 9999, 9999]
];
var currentTime = 0;

var PB = 100000;

const lemmaCount = 4;
var currentLemmaNumber = 1;
var provedLemmas = 0;
var isLemmaProved = [false, false, false,false, false, false, false, false]
var initialQ = [BigNumber.ZERO, BigNumber.ZERO, BigNumber.ZERO, BigNumber.ZERO, BigNumber.ZERO, BigNumber.ZERO, BigNumber.ZERO, BigNumber.ZERO];
var qs = Array.from(initialQ);
var currencyValues = [BigNumber.ZERO, BigNumber.ZERO, BigNumber.ZERO, BigNumber.ZERO, BigNumber.ZERO, BigNumber.ZERO, BigNumber.ZERO, BigNumber.ZERO];
var PBs = [BigNumber.THOUSAND, BigNumber.THOUSAND, BigNumber.THOUSAND, BigNumber.THOUSAND, BigNumber.THOUSAND, BigNumber.THOUSAND, BigNumber.THOUSAND, BigNumber.THOUSAND,];
var qDifferential = BigNumber.ZERO;

const isRTL = Localization.isRTL;

var init = () => {
    currency = theory.createCurrency();


    ///////////////////
    // Regular Upgrades

    // Lemma 1
    let baseId = 0;

    // c1
    {
        let getDesc = (level) => "c_1=5^{" + level + "}";
        let getInfo = (level) => "c_1=" + getC11(level).toString(0);
        c11 = theory.createUpgrade(baseId + 0, currency, new FirstFreeCost(new ExponentialCost(10, Math.log2(10))));
        c11.getDescription = (amount) => Utils.getMath(getDesc(c11.level));
        c11.getInfo = (amount) => Utils.getMathTo(getInfo(c11.level), getInfo(c11.level + amount));
    }

    // c2
    {
        let getDesc = (level) => "c_2=5^{" + level + "}";
        let getInfo = (level) => "c_2=" + getC12(level).toString(0);
        c12 = theory.createUpgrade(baseId + 1, currency, new ExponentialCost(1, Math.log2(10)));
        c12.getDescription = (amount) => Utils.getMath(getDesc(c12.level));
        c12.getInfo = (amount) => Utils.getMathTo(getInfo(c12.level), getInfo(c12.level + amount));
    }

    // c3
    {
        let getDesc = (level) => "c_3=5^{" + level + "}";
        let getInfo = (level) => "c_3=" + getC13(level).toString(0);
        c13 = theory.createUpgrade(baseId + 2, currency, new ExponentialCost(1, Math.log2(10)));
        c13.getDescription = (amount) => Utils.getMath(getDesc(c13.level));
        c13.getInfo = (amount) => Utils.getMathTo(getInfo(c13.level), getInfo(c13.level + amount));
    }

 
    // Lemma 2
    baseId += 100;

    // c1
    {
        let getDesc = (level) => "c_1=2^{" + level + "}";
        let getInfo = (level) => "c_1=" + getC21(level).toString(0);
        c21 = theory.createUpgrade(baseId + 0, currency, new FirstFreeCost(new ExponentialCost(100, Math.log2(10**3))));
        c21.getDescription = (amount) => Utils.getMath(getDesc(c21.level));
        c21.getInfo = (amount) => Utils.getMathTo(getInfo(c21.level), getInfo(c21.level + amount));
        c21.boughtOrRefunded = (_) => theory.invalidateSecondaryEquation();
    }

    // c2
    {
        let getDesc = (level) => "c_2=3^{" + level + "}";
        let getInfo = (level) => "c_2=" + getC22(level).toString(0);
        c22 = theory.createUpgrade(baseId + 1, currency, new ExponentialCost(200, Math.log2(10**3)));
        c22.getDescription = (amount) => Utils.getMath(getDesc(c22.level));
        c22.getInfo = (amount) => Utils.getMathTo(getInfo(c22.level), getInfo(c22.level + amount));
        c22.boughtOrRefunded = (_) => theory.invalidateSecondaryEquation();
    }

    // c3
    {
        let getDesc = (level) => "c_3=4^{" + level + "}";
        let getInfo = (level) => "c_3=" + getC23(level).toString(0);
        c23 = theory.createUpgrade(baseId + 2, currency, new ExponentialCost(300, Math.log2(10**3)));
        c23.getDescription = (amount) => Utils.getMath(getDesc(c23.level));
        c23.getInfo = (amount) => Utils.getMathTo(getInfo(c23.level), getInfo(c23.level + amount));
        c23.boughtOrRefunded = (_) => theory.invalidateSecondaryEquation();
    }

    // c4
    {
        let getDesc = (level) => "c_4=5^{" + level + "}";
        let getInfo = (level) => "c_4=" + getC24(level).toString(0);
        c24 = theory.createUpgrade(baseId + 3, currency, new ExponentialCost(400, Math.log2(10**3)));
        c24.getDescription = (amount) => Utils.getMath(getDesc(c24.level));
        c24.getInfo = (amount) => Utils.getMathTo(getInfo(c24.level), getInfo(c24.level + amount));
        c24.boughtOrRefunded = (_) => theory.invalidateSecondaryEquation();
    }

     // c5
     {
        let getDesc = (level) => "c_5=6^{" + level + "}";
        let getInfo = (level) => "c_5=" + getC25(level).toString(0);
        c25 = theory.createUpgrade(baseId + 4, currency, new ExponentialCost(500, Math.log2(10**3)));
        c25.getDescription = (amount) => Utils.getMath(getDesc(c25.level));
        c25.getInfo = (amount) => Utils.getMathTo(getInfo(c25.level), getInfo(c25.level + amount));
        c25.boughtOrRefunded = (_) => theory.invalidateSecondaryEquation();
    }

    // Lemma 3
    baseId += 100;

  

    // c1
    {
        
        let getDesc = (level) => "c_1=2^{" + level + "}";
        let getInfo = (level) => "c_1=" + getC31(level).toString(0);
        c31 = theory.createUpgrade(baseId + 2, currency, new FirstFreeCost(new ExponentialCost(200, Math.log2(2))));
        c31.getDescription = (amount) => Utils.getMath(getDesc(c31.level));
        c31.getInfo = (amount) => Utils.getMathTo(getInfo(c31.level), getInfo(c31.level + amount));
    }

    // c2
    {
        let getDesc = (level) => "c_2=2^{" + level + "}";
        let getInfo = (level) => "c_2=" + getC32(level).toString(0);
        c32 = theory.createUpgrade(baseId + 3, currency, new ExponentialCost(100, Math.log2(2)));
        c32.getDescription = (amount) => Utils.getMath(getDesc(c32.level));
        c32.getInfo = (amount) => Utils.getMathTo(getInfo(c32.level), getInfo(c32.level + amount));
        
    }

    // c3
    {
        let getDesc = (level) => "c_3=2^{" + level + "}";
        let getInfo = (level) => "c_3=" + getC33(level).toString(0);
        c33 = theory.createUpgrade(baseId + 4, currency, new ExponentialCost(100, Math.log2(2)));
        c33.getDescription = (amount) => Utils.getMath(getDesc(c33.level));
        c33.getInfo = (amount) => Utils.getMathTo(getInfo(c33.level), getInfo(c33.level + amount));
    }

    // Lemma 4
    baseId += 100;

    // c1
    {
        let getDesc = (level) => "c_1=" + getC41(level).toString(0);
        let getInfo = (level) => "c_1=" + getC41(level).toString(0);
        c41 = theory.createUpgrade(baseId + 0, currency, new FirstFreeCost(new ExponentialCost(1, Math.log2(2.87))));
        c41.getDescription = (amount) => Utils.getMath(getDesc(c41.level));
        c41.getInfo = (amount) => Utils.getMathTo(getInfo(c41.level), getInfo(c41.level + amount));
    }

    // c2
    {
        let getDesc = (level) => "c_2=2^{" + level + "}";
        let getInfo = (level) => "c_2=" + getC42(level).toString(0);
        c42 = theory.createUpgrade(baseId + 1, currency, new ExponentialCost(5000, Math.log2(10)));
        c42.getDescription = (amount) => Utils.getMath(getDesc(c42.level));
        c42.getInfo = (amount) => Utils.getMathTo(getInfo(c42.level), getInfo(c42.level + amount));
    }

    // c3
    {
        let getDesc = (level) => "c_3=" + (level + 1);
        let getInfo = (level) => "c_3=" + getC43(level).toString(0);
        c43 = theory.createUpgrade(baseId + 2, currency, new ExponentialCost(1, Math.log2(10**0.003)));
        c43.getDescription = (amount) => Utils.getMath(getDesc(c43.level));
        c43.getInfo = (amount) => Utils.getMathTo(getInfo(c43.level), getInfo(c43.level + amount));
    }
     // c4
     {
        let getDesc = (level) => "c_4=" + (level + 1);
        let getInfo = (level) => "c_4=" + getC44(level).toString(0);
        c44 = theory.createUpgrade(baseId + 3, currency, new ExponentialCost(1, Math.log2(10**0.003)));
        c44.getDescription = (amount) => Utils.getMath(getDesc(c44.level));
        c44.getInfo = (amount) => Utils.getMathTo(getInfo(c44.level), getInfo(c44.level + amount));
    }

    // Lemma 5
    baseId += 100;

    // q1
    {
        let getDesc = (level) => "q_1=" + getQ51(level).toString(0);
        let getInfo = (level) => "q_1=" + getQ51(level).toString(0);
        q51 = theory.createUpgrade(baseId + 0, currency, new ExponentialCost(10, Math.log2(3)));
        q51.getDescription = (amount) => Utils.getMath(getDesc(q51.level));
        q51.getInfo = (amount) => Utils.getMathTo(getInfo(q51.level), getInfo(q51.level + amount));
    }

    // q2
    {
        let getDesc = (level) => "q_2=2^{" + level + "}";
        let getInfo = (level) => "q_2=" + getQ52(level).toString(0);
        q52 = theory.createUpgrade(baseId + 1, currency, new ExponentialCost(30, Math.log2(10)));
        q52.getDescription = (amount) => Utils.getMath(getDesc(q52.level));
        q52.getInfo = (amount) => Utils.getMathTo(getInfo(q52.level), getInfo(q52.level + amount));
    }

    // c1
    {
        let getDesc = (level) => "c_1=" + getC5i(level).toString(0);
        let getInfo = (level) => "c_1=" + getC5i(level).toString(0);
        c51 = theory.createUpgrade(baseId + 2, currency, new FreeCost());
        c51.getDescription = (amount) => Utils.getMath(getDesc(c51.level));
        c51.getInfo = (amount) => Utils.getMathTo(getInfo(c51.level), getInfo(c51.level + amount));
    }

    // c2
    {
        let getDesc = (level) => "c_2=" + getC5i(level).toString(0);
        let getInfo = (level) => "c_2=" + getC5i(level).toString(0);
        c52 = theory.createUpgrade(baseId + 3, currency, new ExponentialCost(1e6, Math.log2(1.1)));
        c52.getDescription = (amount) => Utils.getMath(getDesc(c52.level));
        c52.getInfo = (amount) => Utils.getMathTo(getInfo(c52.level), getInfo(c52.level + amount));
    }

    // c3
    {
        let getDesc = (level) => "c_3=" + getC5i(level).toString(0);
        let getInfo = (level) => "c_3=" + getC5i(level).toString(0);
        c53 = theory.createUpgrade(baseId + 4, currency, new ExponentialCost(1e11, Math.log2(1.1)));
        c53.getDescription = (amount) => Utils.getMath(getDesc(c53.level));
        c53.getInfo = (amount) => Utils.getMathTo(getInfo(c53.level), getInfo(c53.level + amount));
    }

    // c4
    {
        let getDesc = (level) => "c_4=" + getC5i(level).toString(0);
        let getInfo = (level) => "c_4=" + getC5i(level).toString(0);
        c54 = theory.createUpgrade(baseId + 5, currency, new ExponentialCost(1e13, Math.log2(1.1)));
        c54.getDescription = (amount) => Utils.getMath(getDesc(c54.level));
        c54.getInfo = (amount) => Utils.getMathTo(getInfo(c54.level), getInfo(c54.level + amount));
    }

    // c5
    {
        let getDesc = (level) => "c_5=" + getC5i(level).toString(0);
        let getInfo = (level) => "c_5=" + getC5i(level).toString(0);
        c55 = theory.createUpgrade(baseId + 6, currency, new ExponentialCost(1e15, Math.log2(1.08)));
        c55.getDescription = (amount) => Utils.getMath(getDesc(c55.level));
        c55.getInfo = (amount) => Utils.getMathTo(getInfo(c55.level), getInfo(c55.level + amount));
    }

    // c6
    {
        let getDesc = (level) => "c_6=" + getC5i(level).toString(0);
        let getInfo = (level) => "c_6=" + getC5i(level).toString(0);
        c56 = theory.createUpgrade(baseId + 7, currency, new ExponentialCost(1e17, Math.log2(1.06)));
        c56.getDescription = (amount) => Utils.getMath(getDesc(c56.level));
        c56.getInfo = (amount) => Utils.getMathTo(getInfo(c56.level), getInfo(c56.level + amount));
    }

    // c7
    {
        let getDesc = (level) => "c_7=" + getC5i(level).toString(0);
        let getInfo = (level) => "c_7=" + getC5i(level).toString(0);
        c57 = theory.createUpgrade(baseId + 8, currency, new ExponentialCost(1e19, Math.log2(1.02)));
        c57.getDescription = (amount) => Utils.getMath(getDesc(c57.level));
        c57.getInfo = (amount) => Utils.getMathTo(getInfo(c57.level), getInfo(c57.level + amount));
    }

    // c8
    {
        let getDesc = (level) => "c_8=" + getC5i(level).toString(0);
        let getInfo = (level) => "c_8=" + getC5i(level).toString(0);
        c58 = theory.createUpgrade(baseId + 9, currency, new ExponentialCost(1e21, Math.log2(1.01)));
        c58.getDescription = (amount) => Utils.getMath(getDesc(c58.level));
        c58.getInfo = (amount) => Utils.getMathTo(getInfo(c58.level), getInfo(c58.level + amount));
    }

    // Lemma 6
    baseId += 100;

    // q1
    {
        let getDesc = (level) => "q_1=" + getQ61(level).toString(0);
        let getInfo = (level) => "q_1=" + getQ61(level).toString(0);
        q61 = theory.createUpgrade(baseId + 0, currency, new ExponentialCost(10, Math.log2(5)));
        q61.getDescription = (amount) => Utils.getMath(getDesc(q61.level));
        q61.getInfo = (amount) => Utils.getMathTo(getInfo(q61.level), getInfo(q61.level + amount));
    }

    // q2
    {
        let getDesc = (level) => "q_2=2^{" + level + "}";
        let getInfo = (level) => "q_2=" + getQ62(level).toString(0);
        q62 = theory.createUpgrade(baseId + 1, currency, new ExponentialCost(100, Math.log2(10)));
        q62.getDescription = (amount) => Utils.getMath(getDesc(q62.level));
        q62.getInfo = (amount) => Utils.getMathTo(getInfo(q62.level), getInfo(q62.level + amount));
    }

    // c1
    {
        let getDesc = (level) => "c_1=" + getC61(level).toString(0);
        let getInfo = (level) => "c_1=" + getC61(level).toString(0);
        c61 = theory.createUpgrade(baseId + 2, currency, new FirstFreeCost(new ExponentialCost(30, Math.log2(10))));
        c61.getDescription = (amount) => Utils.getMath(getDesc(c61.level));
        c61.getInfo = (amount) => Utils.getMathTo(getInfo(c61.level), getInfo(c61.level + amount));
    }

    // c2
    {
        let getDesc = (level) => "c_2=" + getC62(level).toString(0);
        let getInfo = (level) => "c_2=" + getC62(level).toString(0);
        c62 = theory.createUpgrade(baseId + 3, currency, new FirstFreeCost(new ExponentialCost(30, Math.log2(10))));
        c62.getDescription = (amount) => Utils.getMath(getDesc(c62.level));
        c62.getInfo = (amount) => Utils.getMathTo(getInfo(c62.level), getInfo(c62.level + amount));
    }

    // c3
    {
        let getDesc = (level) => "c_3=" + level + "^{1/e}";
        let getInfo = (level) => "c_3=" + getC63(level).toString(4);
        c63 = theory.createUpgrade(baseId + 4, currency, new ExponentialCost(1e6, Math.log2(1.15)));
        c63.getDescription = (amount) => Utils.getMath(getDesc(c63.level));
        c63.getInfo = (amount) => Utils.getMathTo(getInfo(c63.level), getInfo(c63.level + amount));
        c63.refunded = (_) => { if (c63.level < 2) c63.Buy(2 - c63.level); }
        c63.canBeRefunded = (_) => c63.level > 2;
        c63.level = 2;
    }

    // c4
    {
        let getDesc = (level) => "c_4=" + level + "^{1/\\pi}";
        let getInfo = (level) => "c_4=" + getC64(level).toString(4);
        c64 = theory.createUpgrade(baseId + 5, currency, new ExponentialCost(1e6, Math.log2(1.15)));
        c64.getDescription = (amount) => Utils.getMath(getDesc(c64.level));
        c64.getInfo = (amount) => Utils.getMathTo(getInfo(c64.level), getInfo(c64.level + amount));
    }

    // Lemma 7
    baseId += 100;

    // q1
    {
        let getDesc = (level) => "q_1=" + getQ71(level).toString(0);
        let getInfo = (level) => "q_1=" + getQ71(level).toString(0);
        q71 = theory.createUpgrade(baseId + 0, currency, new FirstFreeCost(new ExponentialCost(10, Math.log2(1.5))));
        q71.getDescription = (amount) => Utils.getMath(getDesc(q71.level));
        q71.getInfo = (amount) => Utils.getMathTo(getInfo(q71.level), getInfo(q71.level + amount));
    }

    // q2
    {
        let getDesc = (level) => "q_2=2^{" + level + "}";
        let getInfo = (level) => "q_2=" + getQ72(level).toString(0);
        q72 = theory.createUpgrade(baseId + 1, currency, new ExponentialCost(30, Math.log2(10)));
        q72.getDescription = (amount) => Utils.getMath(getDesc(q72.level));
        q72.getInfo = (amount) => Utils.getMathTo(getInfo(q72.level), getInfo(q72.level + amount));
    }

    // c1
    {
        let getDesc = (level) => "c_1=" + getC71(level).toString(0);
        let getInfo = (level) => "c_1=" + getC71(level).toString(0);
        c71 = theory.createUpgrade(baseId + 2, currency, new ExponentialCost(10000, Math.log2(1.2)));
        c71.getDescription = (amount) => Utils.getMath(getDesc(c71.level));
        c71.getInfo = (amount) => Utils.getMathTo(getInfo(c71.level), getInfo(c71.level + amount));
    }

    // c2
    {
        let getDesc = (level) => "c_2=" + getC72(level).toString(0);
        let getInfo = (level) => "c_2=" + getC72(level).toString(0);
        c72 = theory.createUpgrade(baseId + 3, currency, new ExponentialCost(10000, Math.log2(1.5)));
        c72.getDescription = (amount) => Utils.getMath(getDesc(c72.level));
        c72.getInfo = (amount) => Utils.getMathTo(getInfo(c72.level), getInfo(c72.level + amount));
    }

       

    {
    
    difficultySelectUpgrade = theory.createPermanentUpgrade(1, currency, new FreeCost());
    //finalUpgrade.maxLevel = 1;
    difficultySelectUpgrade.description = "Select difficulty level";
    difficultySelectUpgrade.getInfo = (_) => "Select difficulty level";
    difficultySelectUpgrade.boughtOrRefunded = (_) => openDifficultySelectMenu();

    }

    {
        hiscoreUpgrade = theory.createPermanentUpgrade(2, currency, new FreeCost());
    //finalUpgrade.maxLevel = 1;
        hiscoreUpgrade.description = "See best attempts";
        hiscoreUpgrade.getInfo = (_) => "See best attempts";
        hiscoreUpgrade.boughtOrRefunded = (_) => openHiscores();
    }

    {
        dilemmaSelectUpgrade = theory.createPermanentUpgrade(3, currency, new FreeCost());
    //finalUpgrade.maxLevel = 1;
        dilemmaSelectUpgrade.description = "Select Dilemma";
        dilemmaSelectUpgrade.getInfo = (_) => "Select Dilemma";
        dilemmaSelectUpgrade.boughtOrRefunded = (_) => openDilemmaSelectMenu();
    }

    ///////////////////
    // Singular Upgrade
    let lemmaCost = new CustomCost((level) =>
    {
        var cost = 1e100;

        switch(level+1)
        {
            case 1: cost = 1e1; break;
            case 2: cost = 4.05e22; break;
            case 3: cost = 2e15; break; 
            case 4: cost = 1.0001e10; break; // To compensate for numerical errors
            case 5: cost = 1e25; break;
            case 6: cost = 1e15; break;
            case 7: cost = 1e15; break;
        }
        
        return BigNumber.from(cost);
    });


    lemma = theory.createSingularUpgrade(0, currency, lemmaCost);
    lemma.maxLevel;
    lemma.getDescription = (_) => Localization.getUpgradeProveLemma(Math.min(lemmaCount, currentLemmaNumber));
    lemma.getInfo = (_) => Localization.getUpgradeProveLemma(Math.min(lemmaCount, currentLemmaNumber));
    lemma.boughtOrRefunded = (_) => {
        if(dilemmaSelectFlag === true) {
            return;
        }
        if(difficultySelectFlag === true) {
            return;
        }

        if(isLemmaProved[currentLemmaNumber - 1] === false && resetStageFlag === false) {
            isLemmaProved[currentLemmaNumber - 1] = true;
            


        } 

        if(resetStageFlag === false) {
            onLemmaProved(currentLemmaNumber);
        }
        
        
        
        //onLemmaChanged();
    theory.invalidatePrimaryEquation();
    theory.invalidateSecondaryEquation(); 
        //refreshEquations();
     }

}

var refreshEquations = () => {

    let lemmaCost = new CustomCost((level) =>
    {
        var cost = 1e100;

        switch(currentLemmaNumber)
        {
            case 1: cost = 1e1; break;
            case 2: cost = 4.05e22; break;
            case 3: cost = 2e15; break; 
            case 4: cost = 1.0001e10; break; // To compensate for numerical errors
            case 5: cost = 1e25; break;
            case 6: cost = 1e15; break;
            case 7: cost = 1e15; break;
        }
        
        return BigNumber.from(cost);
    });


    
    onLemmaChanged();
    theory.invalidatePrimaryEquation();
    theory.invalidateSecondaryEquation();
    updateAvailability();
    dilemmaSelectFlag = false;
    difficultySelectFlag = false;
    
}

var openHiscores = () => {
    let menu = ui.createPopup
    ({
        isPeekable: true,
        title: "Personal Best Attempts",
        content: ui.createStackLayout
        ({
            
            children :
            [
                ui.createLabel
                ({
                    text: "Dilemma 1",
                    isVisible : true,
                    
                }),
                ui.createLabel
                ({
                    text: "Easy: " + bestTimes[0][0] + "  Normal: " + bestTimes[0][1] + "  Core: "
                     + bestTimes[0][2],
                    isVisible : true,
                    
                }),
                ui.createLabel
                ({
                    text: "Hard: " + bestTimes[0][3] + "  Hax: " + bestTimes[0][4],
                    isVisible : true,
                    
                }),
                ui.createLabel
                ({
                    text: "",
                    isVisible : true,
                    
                }),

                ui.createLabel
                ({
                    text: "Dilemma 2",
                    isVisible : true,
                    
                }),
                ui.createLabel
                ({
                    text: "Easy: " + bestTimes[1][0] + "  Normal: " + bestTimes[1][1] + "  Core: "
                     + bestTimes[1][2],
                    isVisible : true,
                    
                }),
                ui.createLabel
                ({
                    text: "Hard: " + bestTimes[1][3] + "  Hax: " + bestTimes[1][4],
                    isVisible : true,
                    
                }),
                ui.createLabel
                ({
                    text: "",
                    isVisible : true,
                    
                }),

                ui.createLabel
                ({
                    text: "Dilemma 3",
                    isVisible : true,
                    
                }),
                ui.createLabel
                ({
                    text: "Easy: " + bestTimes[2][0] + "  Normal: " + bestTimes[2][1] + "  Core: "
                     + bestTimes[2][2],
                    isVisible : true,
                    
                }),
                ui.createLabel
                ({
                    text: "Hard: " + bestTimes[2][3] + "  Hax: " + bestTimes[2][4],
                    isVisible : true,
                    
                }),
                ui.createLabel
                ({
                    text: "",
                    isVisible : true,
                    
                }),

                ui.createLabel
                ({
                    text: "Dilemma 4",
                    isVisible : true,
                    
                }),
                ui.createLabel
                ({
                    text: "Easy: " + bestTimes[3][0] + "  Normal: " + bestTimes[3][1] + "  Core: "
                     + bestTimes[3][2],
                    isVisible : true,
                    
                }),
                ui.createLabel
                ({
                    text: "Hard: " + bestTimes[3][3] + "  Hax: " + bestTimes[3][4],
                    isVisible : true,
                    
                }),
                ui.createLabel
                ({
                    text: "",
                    isVisible : true,
                    
                }),
                
                

            
                ui.createScrollView
                ({
                    heightRequest: ui.screenHeight * 0.32,
                    
                    orientation: ScrollOrientation.BOTH
                }),
                ui.createBox
                ({
                    heightRequest: 1,
                    margin: new Thickness(0, 6)
                }),
                ui.createGrid
                ({
                    rowDefinitions: [96],
                    columnDefinitions: ['4*', '1*'],
                    margin: new Thickness(0, 0, 0, 6),
                    
                }),
                ui.createButton
                ({
                    text: "Exit",
                    onClicked: () =>
                    {
                        Sound.playClick();
                        menu.hide();
                    }
                })
            ]
        })
    });
    menu.show();
    return menu;
}

var openDilemmaSelectMenu = () => {
    let menu = ui.createPopup
    ({
        isPeekable: true,
        title: "Dilemma Selection",
        content: ui.createStackLayout
        ({
            
            children :
            [
                
                

                ui.createButton
                ({
                    text: "Dilemma 1",
                    isVisible : true,
                    onClicked: () =>
                    {
                        Sound.playClick();
                        openDilemmaConfirmationPopup(1);
                        
                        
                    }
                }),
                ui.createButton
                ({
                    text: "Dilemma 2",
                    isVisible : true,
                    onClicked: () =>
                    {
                        Sound.playClick();
                        openDilemmaConfirmationPopup(2);
                    
                        
                    }
                }),
                ui.createButton
                ({
                    text: "Dilemma 3",
                    isVisible : true,
                    onClicked: () =>
                    {
                        Sound.playClick();
                        openDilemmaConfirmationPopup(3);
                    
                        
                    }
                }),
                ui.createButton
                ({
                    text: "Dilemma 4",
                    isVisible : true,
                    onClicked: () =>
                    {
                        Sound.playClick();
                        openDilemmaConfirmationPopup(4);
                    
                        
                    }
                }),


                ui.createScrollView
                ({
                    heightRequest: ui.screenHeight * 0.32,
                    
                    orientation: ScrollOrientation.BOTH
                }),
                ui.createBox
                ({
                    heightRequest: 1,
                    margin: new Thickness(0, 6)
                }),
                ui.createGrid
                ({
                    rowDefinitions: [96],
                    columnDefinitions: ['4*', '1*'],
                    margin: new Thickness(0, 0, 0, 6),
                    
                }),
                ui.createButton
                ({
                    text: "Exit",
                    onClicked: () =>
                    {
                        Sound.playClick();
                        menu.hide();
                    }
                })
            ]
        })
    });
    menu.show();
    return menu;
}

var setDifficulty = (difficulty) => {
    if(difficulty === "easy") {
        this.difficulty = 1;
    } else if(difficulty === "normal") {
        this.difficulty = 2;
    } else if(difficulty === "core") {
        this.difficulty = 3;
    } else if(difficulty === "hard") {
        this.difficulty = 4;
    } else if(difficulty === "hax"){
        this.difficulty = 5;
    }
}

var openDifficultyConfirmationPopup = (difficulty) => {
    let menu = ui.createPopup
    ({
        isPeekable: true,
        title: "Confirm Difficulty",
        content: ui.createStackLayout
        ({
            
            children :
            [
                
               
                ui.createStackLayout
                ({
                    //column: 2,
                    
                    

                    children: [
                        ui.createButton
                        ({
                            text: "Confirm",
                            isVisible: true,
                            onClicked: () =>
                                {
                                    setDifficulty(difficulty);
                                    difficultySelectFlag = true;
                                    resetStage();
                                    Sound.playClick();
                                    //onLemmaChanged();
                                    refreshEquations();
                                    menu.hide();
                                }
                        }),
                        ui.createButton
                        ({
                            text: "Cancel",
                            isVisible: true,
                            onClicked: () =>
                                {
                                    Sound.playClick();
                                    menu.hide();
                                }
                        }),
                        

                    ]
                }),



            ]
                    
                
                
            
        })
    });
    menu.show();
    return menu;
}

var openDilemmaConfirmationPopup = (lemmaNumber) => {
    let menu = ui.createPopup
    ({
        isPeekable: true,
        title: "Confirm Selection",
        content: ui.createStackLayout
        ({
            
            children :
            [
                
               
                ui.createStackLayout
                ({
                    //column: 2,
                    
                    

                    children: [
                        ui.createButton
                        ({
                            text: "Confirm",
                            isVisible: true,
                            onClicked: () =>
                                {
                                    currentLemmaNumber = lemmaNumber;
                                    dilemmaSelectFlag = true;
                                    Sound.playClick();
                                    //onLemmaChanged();
                                    refreshEquations();
                                    menu.hide();
                                }
                        }),
                        ui.createButton
                        ({
                            text: "Cancel",
                            isVisible: true,
                            onClicked: () =>
                                {
                                    Sound.playClick();
                                    menu.hide();
                                }
                        }),
                        

                    ]
                }),



            ]
                    
                
                
            
        })
    });
    menu.show();
    return menu;
}

var openDifficultySelectMenu = () => {
    let menu = ui.createPopup
    ({
        isPeekable: true,
        title: "Difficulty Settings",
        content: ui.createStackLayout
        ({
            
            children :
            [
                
                
                ui.createButton
                ({
                    text: "Easy",
                    isVisible : true,
                    onClicked: () =>
                    {
                        Sound.playClick();
                        openDifficultyConfirmationPopup("easy");
                        
                        
                    }
                }),

                ui.createButton
                ({
                    text: "Normal",
                    isVisible : true,
                    onClicked: () =>
                    {
                        Sound.playClick();
                        openDifficultyConfirmationPopup("normal");
                        
                        
                    }
                }),
                ui.createButton
                ({
                    text: "Core",
                    isVisible : true,
                    onClicked: () =>
                    {
                        Sound.playClick();
                        openDifficultyConfirmationPopup("core");
                        
                        
                    }
                }),

                ui.createButton
                ({
                    text: "Hard",
                    isVisible : true,
                    onClicked: () =>
                    {
                        Sound.playClick();
                        openDifficultyConfirmationPopup("hard");
                        
                        
                    }
                }),
                ui.createButton
                ({
                    text: "Hax",
                    isVisible : true,
                    onClicked: () =>
                    {
                        Sound.playClick();
                        openDifficultyConfirmationPopup("hax");
                        
                        
                    }
                }),

                ui.createScrollView
                ({
                    heightRequest: ui.screenHeight * 0.32,
                    
                    orientation: ScrollOrientation.BOTH
                }),
                ui.createBox
                ({
                    heightRequest: 1,
                    margin: new Thickness(0, 6)
                }),
                ui.createGrid
                ({
                    rowDefinitions: [96],
                    columnDefinitions: ['4*', '1*'],
                    margin: new Thickness(0, 0, 0, 6),
                    
                }),
                ui.createButton
                ({
                    text: "Exit",
                    onClicked: () =>
                    {
                        Sound.playClick();
                        menu.hide();
                    }
                })
            ]
        })
    });
    menu.show();
    return menu;
}





var updateAvailability = () => {
    c11.isAvailable = currentLemmaNumber == 1;
    c12.isAvailable = currentLemmaNumber == 1;
    c13.isAvailable = currentLemmaNumber == 1;
    

    c21.isAvailable = currentLemmaNumber == 2;
    c22.isAvailable = currentLemmaNumber == 2;
    c23.isAvailable = currentLemmaNumber == 2;
    c24.isAvailable = currentLemmaNumber == 2;
    c25.isAvailable = currentLemmaNumber == 2;
    

    
    c31.isAvailable = currentLemmaNumber == 3;
    c32.isAvailable = currentLemmaNumber == 3;
    c33.isAvailable = currentLemmaNumber == 3; 
    

    c41.isAvailable = currentLemmaNumber == 4;
    c42.isAvailable = currentLemmaNumber == 4;
    c43.isAvailable = currentLemmaNumber == 4;
    c44.isAvailable = currentLemmaNumber == 4;

    q51.isAvailable = lemma.level == 4;
    q52.isAvailable = lemma.level == 4;
    c51.isAvailable = lemma.level == 4;
    c52.isAvailable = lemma.level == 4;
    c53.isAvailable = lemma.level == 4;
    c54.isAvailable = lemma.level == 4;
    c55.isAvailable = lemma.level == 4;
    c56.isAvailable = lemma.level == 4;
    c57.isAvailable = lemma.level == 4;
    c58.isAvailable = lemma.level == 4;

    q61.isAvailable = lemma.level == 5;
    q62.isAvailable = lemma.level == 5;
    c61.isAvailable = lemma.level == 5;
    c62.isAvailable = lemma.level == 5;
    c63.isAvailable = lemma.level == 5;
    c64.isAvailable = lemma.level == 5;

    q71.isAvailable = lemma.level == 6;
    q72.isAvailable = lemma.level == 6;
    c71.isAvailable = lemma.level == 6;
    c72.isAvailable = lemma.level == 6;

    
}

var onLemmaChanged = () => {
    //provedLemmas = Math.max(provedLemmas, lemma.level);
    currency.value = currencyValues[currentLemmaNumber - 1];
    lemma.level = currentLemmaNumber - 1;
    theory.clearGraph();
}

var onLemmaProved = (lemmaNumber) => {
    
    let temp = Math.round(qs[lemmaNumber - 1] * 10) / 10
    
    if(temp < bestTimes[lemmaNumber - 1][difficulty - 1]) {
        
        bestTimes[lemmaNumber - 1][difficulty - 1] = temp;

    }
        
}

var tick = (elapsedTime, multiplier) => {


    
    difficultySelectFlag = false;
    dilemmaSelectFlag = false;
    resetStageFlag = false;



    let dt = BigNumber.from(elapsedTime); // No multiplier. Everyone is equal.
    let lemmaNumber = currentLemmaNumber;
    let isLemmaStarted = qs[currentLemmaNumber - 1] > initialQ[currentLemmaNumber - 1];
    getSecondaryEquation();
   
    switch(lemmaNumber)
    {
        case 1: isLemmaStarted = c11.level > 0; break;
        case 2: isLemmaStarted |= c21.level > 0 || c23.level > 0; break;
        case 3: isLemmaStarted |= c31.level > 0; break;
        case 4: isLemmaStarted |= c41.level > 0; break;
        case 5: isLemmaStarted |= c51.level > 0 || c52.level > 0 || c53.level > 0 || c54.level > 0 ||
                                  c55.level > 0 || c56.level > 0 || c57.level > 0 || c58.level > 0; break;
        case 6: isLemmaStarted |= c61.level > 0 || q62.level > 0; break;
        case 7: isLemmaStarted |= q71.level > 0; break;
    }

    if (isLemmaStarted && !isLemmaProved[currentLemmaNumber - 1])
    {
        
        let q1q2 = BigNumber.ONE;
        
        //difficultySelectUpgrade.isAvailable = false;

        switch(lemmaNumber)
        {
            
            case 5: q1q2 = getQ51(q51.level) * getQ52(q52.level); break;
            case 6: q1q2 = getQ61(q61.level) * getQ62(q62.level); break;
            case 7: q1q2 = getQ71(q71.level) * getQ72(q72.level); break;
        }

        let dq = q1q2 * dt;
        let qt0 = qs[currentLemmaNumber - 1];
        let qt1 = qt0 + dq;
        let q = qt1;

        qs[currentLemmaNumber - 1] = q;

        if (lemmaNumber == 1)
        {
            
            let c1 = getC11(c11.level);
            let c2 = getC12(c12.level);
            let c3 = getC13(c13.level);
            
            let k = 1;

            switch(this.difficulty) {

                
                case 1: // easy
                    k = 2.0;
                    break;
                case 2: // normal
                    if(q > 600) {
                        k = 0;
                    } else if(q > 540) {
                        k = 0.2;
                    } else {
                        k = 2.0;
                    }
                    break;
                case 3: // core
                    if(q > 600) {
                        k = 0;
                    } else if(q > 540) {
                        k = 0.2;
                    } else {
                        k = 1.0;
                    }
                    break;
                case 4: // hard
                    if(q > 600) {
                        k = 0;
                    } else if(q > 540) {
                        k = 0.2;
                    } else {
                        k = 0.90;
                    }
                    break;
                case 5: // hax
                    if(q > 600) {
                        k = 0;
                    } else if(q > 540) {
                        k = 0.13;
                    } else 
                        k = 0.90;
                


            }
            
            
           
            currency.value += dt*k*(c1 * (((0.01*q) / (2*Math.PI)) % (2*Math.PI)) + c2 * (((0.01*q)**2 / (2*Math.PI)) % (2*Math.PI)) + c3 * (((0.01*q)**3 / (2*Math.PI)) % (2*Math.PI)));
        }
        else if (lemmaNumber == 2)
        {
            let c1 = getC21(c21.level);
            let c2 = getC22(c22.level);
            let c3 = getC23(c23.level);
            let c4 = getC24(c24.level);
            let c5 = getC25(c25.level);
            qDifferential = (c1 * c2 * c3 * c4 * c5) * (600 - q)/ 600;

            switch(this.difficulty) {
                
                case 1:
                    currency.value += dt * (600-q)/3000 * c1*c2*c3*c4*c5*q;
                    break;
                case 2:
                    currency.value += dt * (600-q)/6000 * c1*c2*c3*c4*c5*q;
                    break;
                case 3:
                    currency.value += dt * (600-q)/9000 * c1*c2*c3*c4*c5*q;
                    break;
                case 4:
                    currency.value += dt * (600-q)/11000 * c1*c2*c3*c4*c5*q;
                    break;

                case 5:
                    currency.value += dt * (600-q)/12000 * c1*c2*c3*c4*c5*q;
                    break;
            }
            
        }
        else if (lemmaNumber == 3)
        {
            let c1 = getC31(c31.level);
            let c2 = getC32(c32.level);
            let c3 = getC33(c33.level);
           
          
            let term1 = c1*(20*Math.sin(q/10) - q/30);
            let term2 = c2*(20 * Math.cos(q/20)**2 - q/30);
            let term3 = c3 * (Math.min(20, 20*Math.abs(Math.tan(q/10)))-q/30);

            switch(this.difficulty) {
                
                
                case 1:
                    term1 = c1*(100*Math.sin(q/10));
                    term2 = c2*(100 * Math.cos(q/20)**2);
                    
                    currency.value += dt * (term1+term2);
                    break;
                case 2:
                    term1 = c1*(100*Math.sin(q/10) - q/30);
                    term2 = c2*(100 * Math.cos(q/20)**2 - q/30);
                    
                    currency.value += dt * (term1+term2);
                    break;
                case 3:
                    term1 = c1*(30*Math.sin(q/10) - q/30);
                    term2 = c2*(30 * Math.cos(q/20)**2 - q/30);
                    term3 = c3 * (Math.min(30, 30*Math.abs(Math.tan(q/10)))-q/30);
                    currency.value += dt * (term1+term2+term3);
                    break;
                case 4:
                    term1 = c1*(25*Math.sin(q/10) - q/30);
                    term2 = c2*(25 * Math.cos(q/20)**2 - q/30);
                    term3 = c3 * (Math.min(25, 25*Math.abs(Math.tan(q/10)))-q/30);
                    currency.value += dt * (term1+term2+term3);
                    break;
                case 5:
                    term1 = c1*(20*Math.sin(q/10) - q/30);
                    term2 = c2*(20 * Math.cos(q/20)**2 - q/30);
                    term3 = c3 * (Math.min(20, 20*Math.abs(Math.tan(q/10)))-q/30);
                    currency.value += dt * (term1+term2+term3);
                    break;
            }

            
            
        }
        else if (lemmaNumber == 4)
        {
            let c1 = getC41(c41.level);
            let c2 = getC42(c42.level);
            let c3 = getC43(c43.level);
            let c4 = getC44(c44.level);
            
            currency.value += dt * c1 * c2 / (c3 * Math.E - c4 * Math.PI);
        }
        else if (lemmaNumber == 5)
        {
            let bc1 = BigNumber.from(c51.level).pow(BigNumber.FOUR) * (2 * 1 - c51.level);
            let bc2 = BigNumber.from(c52.level).pow(BigNumber.FOUR) * (2 * 4 - c52.level);
            let bc3 = BigNumber.from(c53.level).pow(BigNumber.FOUR) * (2 * 9 - c53.level);
            let bc4 = BigNumber.from(c54.level).pow(BigNumber.FOUR) * (2 * 16 - c54.level);
            let bc5 = BigNumber.from(c55.level).pow(BigNumber.FOUR) * (2 * 25 - c55.level);
            let bc6 = BigNumber.from(c56.level).pow(BigNumber.FOUR) * (2 * 36 - c56.level);
            let bc7 = BigNumber.from(c57.level).pow(BigNumber.FOUR) * (2 * 49 - c57.level);
            let bc8 = BigNumber.from(c58.level).pow(BigNumber.FOUR) * (2 * 64 - c58.level);
            let t1 = bc1 * q;
            let t2 = bc2 * q;
            let t3 = bc3 * q;
            let t4 = bc4 * q;
            let t5 = bc5 * q;
            let t6 = bc6 * q;
            let t7 = bc7 * q;
            let t8 = bc8 * q;
            qDifferential = (t1 + t2 + t3 + t4 + t5 + t6 + t7 + t8);
            currency.value += dt * qDifferential;
        }
        else if (lemmaNumber == 6)
        {
            let c1 = getC61(c61.level);
            let c2 = getC62(c62.level);
            let c3 = getC63(c63.level);
            let c4 = getC64(c64.level);
            let factor = (c1 - c2) / (c3 - c4);
            currency.value += dt * factor * (qt0 + qt1) / BigNumber.TWO;
        }
        else if (lemmaNumber == 7)
        {
            let c1 = getC71(c71.level);
            let c2 = getC72(c72.level);
            let factor = BigNumber.ONE / (BigNumber.E - c1 / c2).abs();
            currency.value += dt * factor * (qt0 + qt1) / BigNumber.TWO;
        }
    }

    currencyValues[currentLemmaNumber - 1] = currency.value;
    theory.invalidateTertiaryEquation();
}

var getInternalState = () => {
    if(isLemmaProved[0] === true && currentLemmaNumber - 1 === 0) {
        return `${bestTimes}`
    }
    log(bestTimes);
    return `${bestTimes}`;
}


var setInternalState = (state) => {
    let values = state.split(" ");
    
    
    if (values.length > 0) bestTimes = state;
    log(bestTimes); 
    
}

var isCurrencyVisible = (index) => currentLemmaNumber - 1 < lemmaCount;
var alwaysShowRefundButtons = () => true;

var getPrimaryEquation = () => {
    theory.primaryEquationHeight = 100;
    let result = "";

    // Theorem
    result += "";

    if (isRTL)
    {
        result += "&\\lim_{t \\to \\infty} f(t) = \\infty&";
        result += "\\text{";
        result += Localization.getConvergenceTestTheorem();
        result += "}";
    }
    else
    {
        result += "";
        result += "";
        result += "";
    }

    // Lemma
    result += "\\\\";

    if (currentLemmaNumber - 1 < lemmaCount)
    {
        result += "";

        if (!isRTL)
        {
            result += "";
            result += "";
            result += "";
            result += "";
        }
        else
        {
            result += "";
        }

        if (currentLemmaNumber == 1) 
            switch(this.difficulty) {
                
                case 1:
                    result += "Dilemma \\; 1";
                    
                    result += "\\\\";
                    result += "";
                    break;
                case 2:
                    result += "\\quad\\quad\\quad \\quad \\quad \\quad \\quad Dilemma \\; 1 \\\\t>540 => \\dot{\\rho}=20\\%,\\;t>600 => \\dot{\\rho}=0";
                    break;
                case 3:
                    result += "\\quad\\quad\\quad \\quad \\quad \\quad \\quad Dilemma \\; 1 \\\\t>540 => \\dot{\\rho}=20\\%,\\;t>600 => \\dot{\\rho}=0";
                    break;
                case 4:
                    result += "\\quad\\quad\\quad \\quad \\quad \\quad \\quad Dilemma \\; 1 \\\\t>540 => \\dot{\\rho}=20\\%,\\;t>600 => \\dot{\\rho}=0";
                    break;
                case 5:
                    result += "\\quad\\quad\\quad \\quad \\quad \\quad \\quad Dilemma \\; 1 \\\\t>540 => \\dot{\\rho}=13\\%,\\;t>600 => \\dot{\\rho}=0";
                    break;
            } 
                
        if (currentLemmaNumber == 2) result += "Dilemma \\; 2";
        if (currentLemmaNumber == 3) result += "Dilemma \\; 3";
        if (currentLemmaNumber == 4) result += "Dilemma \\; 4";
        if (lemma.level == 4) result += "Dilemma \\; 5";
        if (lemma.level == 5) result += "Dilemma \\; 6";
        if (lemma.level == 6) result += "Dilemma \\; 7";

        if (isRTL)
        {
            result += "&\\text{";
            result += Localization.getConvergenceTestLemma(currentLemmaNumber);
            result += "}";
        }
    }

    result += "";

    return result;
}

var getSecondaryEquation = () => {
    theory.secondaryEquationHeight = 100;
    let result = "";
    let lemmaNumber = currentLemmaNumber;

    if (lemmaNumber == 1)
    {
        result += "\\begin{matrix}";
        result += "\\dot{\\rho} =";
        switch(this.difficulty) {
            
            case 1:
                result += "2(c_1 (\\frac{q}{2\\pi}mod\\;2\\pi) + c_2(\\frac{q^2}{2\\pi}mod\\;2\\pi)+c_3(\\frac{q^3}{2\\pi}mod\\;2\\pi))";
                break;
            case 2:
                result += "2c_1 (\\frac{q}{2\\pi}mod\\;2\\pi) + c_2(\\frac{q^2}{2\\pi}mod\\;2\\pi)+c_3(\\frac{q^3}{2\\pi}mod\\;2\\pi)";
                break;
            case 3:
                result += "(c_1 (\\frac{q}{2\\pi}mod\\;2\\pi) + c_2(\\frac{q^2}{2\\pi}mod\\;2\\pi)+c_3(\\frac{q^3}{2\\pi}mod\\;2\\pi))";
                break;
            case 4:
                result += "0.9(c_1 (\\frac{q}{2\\pi}mod\\;2\\pi) + c_2(\\frac{q^2}{2\\pi}mod\\;2\\pi)+c_3(\\frac{q^3}{2\\pi}mod\\;2\\pi))";
                break;
            case 5:
                result += "0.9(c_1 (\\frac{q}{2\\pi}mod\\;2\\pi) + c_2(\\frac{q^2}{2\\pi}mod\\;2\\pi)+c_3(\\frac{q^3}{2\\pi}mod\\;2\\pi))";
                break;

        }
    
        result += "\\\\";
        
        result += "\\dot{t}=1 \\;\\;\\;\\; \\dot{q}=0.01";
        result += "\\end{matrix}";
    }
    else if (lemmaNumber == 2)
    {
        result += "\\begin{matrix}";
        switch(this.difficulty) {
            
            case 1:
                result += "\\dot{\\rho}=(c_1c_2c_3c_4c_5)\\frac{600-t}{3000}";
                break;
            case 2:
                result += "\\dot{\\rho}=(c_1c_2c_3c_4c_5)\\frac{600-t}{9000}";
                break;
            case 3:
                result += "\\dot{\\rho}=(c_1c_2c_3c_4c_5)\\frac{600-t}{11000}";
                break;
            case 4:
                result += "\\dot{\\rho}=(c_1c_2c_3c_4c_5)\\frac{600-t}{12000}";
                break;
        }
        
        result += "";
        result += "\\\\";
        result += "\\dot{t}=1";
        result += "\\end{matrix}";
    }
    else if (lemmaNumber == 3)
    {
        result += "\\begin{matrix}";
        switch(this.difficulty) {
            
            case 1:
                result += "\\dot{\\rho} = a + b\\\\";
                result += "a=c_1(100sin(\\frac{t}{10})";
                result += "\\\\";
                result += "b=c_2(100cos^2(\\frac{t}{20})";
                
                break;
            case 2:
                result += "\\dot{\\rho} = a + b + c\\\\";
                result += "a=c_1(100sin(\\frac{t}{10}) - \\frac{t}{30})";
                result += "\\\\";
                result += "b=c_2(100cos^2(\\frac{t}{20}) - \\frac{t}{30})";
                
                break;
            case 3:
                result += "\\dot{\\rho} = a + b\\\\";
                result += "a=c_1(30sin(\\frac{t}{10}) - \\frac{t}{30})";
                result += "\\\\";
                result += "b=c_2(30cos^2(\\frac{t}{20}) - \\frac{t}{30})";
                result += "\\\\";
                result += "c=c_3(min(30, abs(30tan(\\frac{t}{10})))-\\frac{t}{30})";
                break;
            case 4:
                result += "\\dot{\\rho} = a + b + c\\\\";
                result += "a=c_1(20sin(\\frac{t}{10}) - \\frac{t}{30})";
                result += "\\\\";
                result += "b=c_2(20cos^2(\\frac{t}{20}) - \\frac{t}{30})";
                result += "\\\\";
                result += "c=c_3(min(20, abs(20tan(\\frac{t}{10})))-\\frac{t}{30})";
                break;
        }




       
        result += "\\\\";
        result += "\\dot{t} = 1";
        result += "\\end{matrix}";
    }
    else if (lemmaNumber == 4)
    {
        result += "\\begin{matrix}";
        switch(this.difficulty) {
            
            case 1:
                result += "\\dot{\\rho} = \\frac{c_1c_2}{c_3e - c_4\\pi}\\\\";
               
                
                break;
            case 2:
                result += "\\dot{\\rho} = a + b + c\\\\";
                result += "a=c_1(100sin(\\frac{t}{10}) - \\frac{t}{30})";
                result += "\\\\";
                result += "b=c_2(100cos^2(\\frac{t}{20}) - \\frac{t}{30})";
                
                break;
            case 3:
                result += "\\dot{\\rho} = a + b\\\\";
                result += "a=c_1(30sin(\\frac{t}{10}) - \\frac{t}{30})";
                result += "\\\\";
                result += "b=c_2(30cos^2(\\frac{t}{20}) - \\frac{t}{30})";
                result += "\\\\";
                result += "c=c_3(min(30, abs(30tan(\\frac{t}{10})))-\\frac{t}{30})";
                break;
            case 4:
                result += "\\dot{\\rho} = a + b + c\\\\";
                result += "a=c_1(20sin(\\frac{t}{10}) - \\frac{t}{30})";
                result += "\\\\";
                result += "b=c_2(20cos^2(\\frac{t}{20}) - \\frac{t}{30})";
                result += "\\\\";
                result += "c=c_3(min(20, abs(20tan(\\frac{t}{10})))-\\frac{t}{30})";
                break;
        }
        result += "\\\\";
        result += "\\dot{t}=1";
        result += "\\end{matrix}";
    }
    else if (lemmaNumber == 5)
    {
        result += "\\begin{matrix}";
        result += "\\dot{\\rho}=\\sum_{i=1}^8 c_i^4(2i^2-c_i) q";
        result += "\\\\";
        result += "\\dot{q}=q_1q_2";
        result += "\\end{matrix}";
    }
    else if (lemmaNumber == 6)
    {
        result += "\\begin{matrix}";
        result += "\\dot{\\rho}=q(c_1 - c_2)/(c_3 - c_4)";
        result += "\\\\";
        result += "\\dot{q}=q_1q_2";
        result += "\\end{matrix}";
    }
    else if (lemmaNumber == 7)
    {
        result += "\\begin{matrix}";
        result += "\\dot{\\rho}=q/|e - c_1/c_2|";
        result += "\\\\";
        result += "\\dot{q}=q_1q_2";
        result += "\\end{matrix}";
    }

    if (lemma.level == lemmaCount)
    {
        result += "\\text{";
        result += Localization.getConvergenceTestQED();
        result += "}";
    }

    return result;
}

var getTertiaryEquation = () => {
    if (currentLemmaNumber - 1 == lemmaCount)
        return "";

    let result = "";
    let q = qs[currentLemmaNumber - 1];

    result += "";
    result += "";
    result+= ""
    
    
    result += "t=";
    result += q.toString();
    result += "\\; \\; \\; \\;";
    
    result += "\\; \\; \\; \\; \\text{Difficulty :} ";
    switch(this.difficulty) {
        
        case 1:
            result += "\\text{easy}";
            break;
        case 2:
            result += "\\text{normal}";
            break;
        case 3:
            result += "\\text{core}";
            break;
        case 4:
            result += "\\text{hard}";
            break;
        case 5:
            result += "\\text{hax}";
            break;
    }

    result += "\\;" + "\\;" + isLemmaProved[0] + "\\;" + bestTimes[0][1] + "\\;" + qs[0] + "\\;" + currentLemmaNumber;
    

    let lemmaNumber = currentLemmaNumber;

    if (lemmaNumber == 2)
    {
       
       
    }
    if (lemmaNumber == 4)
    {

    }
   
    if (lemmaNumber == 6)
    {
      
    }
    else if (lemmaNumber == 7)
    {
     
    }

    return result;
}


var getCompletion = () => Math.min(100, Math.round((100.0 * provedLemmas) / lemmaCount));
var get2DGraphValue = () => currency.value.sign * (BigNumber.ONE + currency.value.abs()).log10().toNumber();

var getC11 = (level) => BigNumber.FIVE.pow(level);
var getC12 = (level) => BigNumber.FIVE.pow(level);
var getC13 = (level) => BigNumber.FIVE.pow(level);


var getC21 = (level) => BigNumber.TWO.pow(level);
var getC22 = (level) => BigNumber.THREE.pow(level);
var getC23 = (level) => BigNumber.FOUR.pow(level);
var getC24 = (level) => BigNumber.FIVE.pow(level);
var getC25 = (level) => BigNumber.SIX.pow(level);

var getQ2Exp = () => BigNumber.from((c21.level + c22.level + c23.level + c24.level) / 100.0);


var getC31 = (level) => c31.level == 0 ? BigNumber.ZERO :  BigNumber.TWO.pow(level);
var getC32 = (level) => BigNumber.TWO.pow(level);
var getC33 = (level) => BigNumber.TWO.pow(level);

var getC41 = (level) => Utils.getStepwisePowerSum(level, 2, 10, 0);
var getC42 = (level) => BigNumber.TWO.pow(level);
var getC43 = (level) => BigNumber.from(level+2);
var getC44 = (level) => BigNumber.from(level+1);

var getQ51 = (level) => Utils.getStepwisePowerSum(level, 2, 10, 1);
var getQ52 = (level) => BigNumber.TWO.pow(level);
var getC5i = (level) => BigNumber.from(level);

var getQ61 = (level) => Utils.getStepwisePowerSum(level, 2, 10, 1);
var getQ62 = (level) => BigNumber.TWO.pow(level);
var getC61 = (level) => Utils.getStepwisePowerSum(level, 2, 10, 0);
var getC62 = (level) => Utils.getStepwisePowerSum(level, 2, 10, 0);
var getC63 = (level) => BigNumber.from(level).pow(BigNumber.ONE / BigNumber.E);
var getC64 = (level) => BigNumber.from(level).pow(BigNumber.ONE / BigNumber.PI);

var getQ71 = (level) => Utils.getStepwisePowerSum(level, 2, 10, 0);
var getQ72 = (level) => BigNumber.TWO.pow(level);
var getC71 = (level) => BigNumber.from(level) + 1;
var getC72 = (level) => BigNumber.from(level) + 1;

var getResetStageMessage = () => Localization.get("TheoryResetConvergenceTest");
var canResetStage = () => lemma.level < lemmaCount;
var resetStage = () => {
    resetStageFlag = true;
    switch (currentLemmaNumber)
    {
        case 1:
            c11.level = 0;
            c12.level = 0;
            c13.level = 0;
            break;
        case 2:
            c21.level = 0;
            c22.level = 0;
            c23.level = 0;
            c24.level = 0;
            c25.level = 0;
            break;
        case 3:
            
            c31.level = 0;
            c32.level = 0;
            c33.level = 0;
            break;
        case 4:
            c41.level = 0;
            c42.level = 0;
            c43.level = 0;
            c44.level = 0;
            break;
        case 5:
            q51.level = 0;
            q52.level = 0;
            c51.level = 0;
            c52.level = 0;
            c53.level = 0;
            c54.level = 0;
            c55.level = 0;
            c56.level = 0;
            c57.level = 0;
            c58.level = 0;
           
            break;
        case 6:
            q61.level = 0;
            q62.level = 0;
            c61.level = 0;
            c62.level = 0;
            c63.level = 2;
            c64.level = 0;
            
            break;
        case 7:
            q71.level = 0;
            q72.level = 0;
            c71.level = 0;
            c72.level = 0;
            
            break;
    }

    isLemmaProved[currentLemmaNumber - 1] = false;
    currency.value = BigNumber.ZERO;
    currencyValues[currentLemmaNumber - 1] = BigNumber.ZERO;
    qs[currentLemmaNumber - 1] = initialQ[currentLemmaNumber - 1];

    qDifferential = BigNumber.ZERO;
    refreshEquations();
    theory.clearGraph();
}

var canGoToPreviousStage = () => lemma.level > 1000;
var goToPreviousStage = () => lemma.level -= 1;
var canGoToNextStage = () => false;
var goToNextStage = () => lemma.level += 1;

init();
