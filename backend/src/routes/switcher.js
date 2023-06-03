class Selector {
    constructor(role, data){
        this.role = role;
        this.data = data;
    }
    select(){
        switch(this.role){
            case 'TL' : return this.calculate(this.data.tl_payrate); break;
            case 'CL-BB' : return this.calculate(this.data.cl_bb); break;
            case 'CL-SFX': return this.calculate(this.data.cl_sfx); break;
            case 'CL-ALL' : return this.calculate(this.data.cl_all); break;
            case 'PR' : return this.calculate(this.data.pr_payrate); break;
            case 'QC' : return this.calculate(this.data.qc_payrate); break;
            case 'TS-BB' : return this.calculate(this.data.ts_bb); break;
            case 'TS-SFX' : return this.calculate(this.data.ts_sfx); break;
            case 'TS-ALL' : return this.calculate(this.data.ts_all); break;
            case 'RP' : return this.calculate(this.data.raw_payrate); break;
        }
    }
    calculate(payrate){
        // calculate the data
        return parseFloat(payrate);
    }
}

module.exports = Selector;