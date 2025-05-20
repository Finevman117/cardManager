import { Enumify } from "enumify"

export class EffectType {
    constructor(area, target) {
        this.area = area
        this.target = target
    }

    setType(type) {
        this.type = type
    }

    toString = () => {
        if (this.area != null) {
            return this.area.toString()
        }
        if (this.area != null) {
            return this.target.toString()
        }
    }
}

export class Area extends Enumify {
    static GLOBALE = new Area()
    static ZONA = new Area()
    static ADIACENTI = new Area()
    static NO_AREA = new Area()
    static _ = this.closeEnum()

    toString = () => {
        if (this.enumKey == Area.GLOBALE) {
            return " A tutti i cacciatori"
        }
        if (this.enumKey == Area.ZONA) {
            return " A tutti i cacciatori nella zona"
        }
        if (this.enumKey == Area.ADIACENTI) {
            return " A tutti i cacciatori nelle zone adiacenti"
        }
        if (this.enumKey == Area.NO_AREA) {
            return ""
        }
    }
}

export class Target extends Enumify {
    static SINGLE_TARGET = new Target("SINGOLO")
    static X_TARGET = new Target("X")
    static SELF = new Target("SELF")
    static _ = this.closeEnum()

    constructor(target) {
        super()
        this.target = target
    }

    toString = () => {
        if (this.target == "SINGOLO") {
            return " Ad un cacciatore"
        }
        if(this.target == "X") {
            return " A X cacciatori"
        }
        if(this.target == "SELF") {
            return "";
        }
    }
}

export class EffettoLibero extends EffectType {
    constructor(effetto) {
        super(Area.NO_AREA, Target.SELF)
        this.effetto = effetto
        this.setType(this.constructor.name)
    }

    toString = () => {
        return this.effetto + super.toString()
    }
}

export class EffettoRiprendi extends EffectType {
    constructor(carta) {
        super(Area.NO_AREA, Target.SELF)
        this.carta = carta
        this.setType(this.constructor.name)
    }

    toString = () => {
        return "Ripredi in mano " + "'" + this.carta + "'" + super.toString()
    }
}

export class EffettoGiocaImmediatamente extends EffectType {
    constructor(carta) {
        super(Area.NO_AREA, Target.SELF)
        this.carta = carta
        this.setType(this.constructor.name)
    }

    toString = () => {
        return "Gioca immediatamente " + "'" + this.carta + "'" + super.toString()
    }
}

export class EffettoArmatura extends EffectType {
    constructor(armatura, area, target) {
        super(area, target)
        this.armatura = armatura
        this.setType(this.constructor.name)
    }

    toString = () => {
        return "Subisci -" + this.armatura + " danno/i" + super.toString()
    }
}

export class EffettoParata extends EffectType {
    constructor(area, target) {
        super(area, target)
        this.setType(this.constructor.name)
    }

    toString = () => {
        return "Questo turno non subisci danno" + super.toString()
    }
}

export class EffettoDanno extends EffectType {
    constructor(damage, area) {
        super(area, Target.SELF)
        this.damage = damage
        this.setType(this.constructor.name)
    }

    toString = () => {
        return "Infliggi " + this.damage + " danno/i" + super.toString()
    }
}

export class EffettoDannoParte extends EffectType {
    constructor(damage, area) {
        super(area, Target.SELF)
        this.damage = damage
        this.setType(this.constructor.name)
    }

    toString = () => {
        return "Infliggi " + this.damage + " danno/i alla parte" + super.toString()
    }
}

export class EffettoStun extends EffectType {
    constructor(stun) {
        super(Area.NO_AREA, Target.SELF)
        this.stun = stun
        this.setType(this.constructor.name)
    }

    toString = () => {
        return "Infliggi " + this.stun + " stun"
    }
}

export class EffettoMovimento extends EffectType {
    constructor(caselle, direzione, area, target) {
        super(area, target)
        this.caselle = caselle
        this.direzione = direzione
        this.setType(this.constructor.name)
    }

    toString = () => {
        return "Puoi muoverti di " + this.caselle + 
            this.direzione != null ? (this.direzione == "left" ? "verso sinistra" : "verso destra") : "" +
            super.toString()
    }
}

export class EffettoSpostamentoLibero extends EffectType {
    constructor() {
        super(Area.NO_AREA, Target.SELF)
        this.setType(this.constructor.name)
    }

    toString = () => {
        return "Puoi spostarti su una casella qualsiasi"
    }
}

export class EffettoRecupero extends EffectType {
    constructor(recupero, area, target) {
        super(area, target)
        this.recupero = recupero
        this.setType(this.constructor.name)
    }

    toString = () => {
        return "Recupera " + this.recupero + super.toString()
    }
}

export class EffettoCura extends EffectType {
    constructor(cura, area, target) {
        super(area, target)
        this.cura = cura
        this.setType(this.constructor.name)
    }

    toString = () => {
        return "Cura " + this.cura + super.toString()
    }
}

export class EffettoSpine extends EffectType {
    constructor(spine, area, target) {
        super(area, target)
        this.spine = spine
        this.setType(this.constructor.name)
    }

    toString = () => {
        return "Spine " + this.spine + super.toString()
    }
}

export class EffettoProfetizza extends EffectType {
    constructor(profetizza) {
        super(Area.NO_AREA, Target.SELF)
        this.profetizza = profetizza
        this.setType(this.constructor.name)
    }

    toString = () => {
        return "Profetizza " + this.profetizza
    }
}

