import de_language         from '../language/de'
import en_language         from '../language/en'
import it_language         from '../language/it'
import pl_language         from '../language/pl'
import ro_language         from '../language/ro'
import tr_language         from '../language/tr'
import auth                from "../utils/auth";
import { LANGUAGES_CODES } from "../utils/enums";

let initial_state = {
    language_type: LANGUAGES_CODES.ENGLISH,
    language: en_language
}

function returnLanguageByCode( state, code ) {
    switch ( code ) {
        case LANGUAGES_CODES.ENGLISH: {
            return Object.assign({}, state, {
                language_type: LANGUAGES_CODES.ENGLISH,
                language: en_language,
            })
        }
        case LANGUAGES_CODES.POLISH: {
            return Object.assign({}, state, {
                language_type: LANGUAGES_CODES.POLISH,
                language: pl_language,
            })
        }
        case LANGUAGES_CODES.TURKISH: {
            return Object.assign({}, state, {
                language_type: LANGUAGES_CODES.TURKISH,
                language: tr_language,
            })
        }
        case LANGUAGES_CODES.ROMANIAN: {
            return Object.assign({}, state, {
                language_type: LANGUAGES_CODES.ROMANIAN,
                language: ro_language,
            })
        }
        case LANGUAGES_CODES.GERMAN: {
            return Object.assign({}, state, {
                language_type: LANGUAGES_CODES.GERMAN,
                language: de_language,
            })
        }
        case LANGUAGES_CODES.ITALIAN: {
            return Object.assign({}, state, {
                language_type: LANGUAGES_CODES.ITALIAN,
                language: it_language,
            })
        }
        default: {
            return state
        }
    }

}

function languageReducer( state = initial_state, action ) {
    switch ( action.type ) {
        case LANGUAGES_CODES.ENGLISH: {
            return returnLanguageByCode(state, action.type)
        }
        case LANGUAGES_CODES.POLISH: {
            return returnLanguageByCode(state, action.type)
        }
        case LANGUAGES_CODES.TURKISH: {
            return returnLanguageByCode(state, action.type)
        }
        case LANGUAGES_CODES.ROMANIAN: {
            return returnLanguageByCode(state, action.type)
        }
        case LANGUAGES_CODES.GERMAN: {
            return returnLanguageByCode(state, action.type)

        }
        case LANGUAGES_CODES.ITALIAN: {
            return returnLanguageByCode(state, action.type)

        }
        case 'LOAD_LANGUAGE_FROM_STORAGE': {
            let language_type = auth.get('language_type')
            if ( !language_type ) {
                return state
            }
            return returnLanguageByCode(state, language_type)

        }
        default: {
            return state
        }

    }
}

export { languageReducer, initial_state }