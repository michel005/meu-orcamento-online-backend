import { Icon } from 'components'

export const EMPTY_FUNCTION = () => {}

const STYLE_ACTIVE_COLOR = { color: 'var(--ACTIVE_COLOR)' }

export const COLORS_SCHEMA = {
	Blue: <Icon icon="box" className="colorSchemaBlue" style={STYLE_ACTIVE_COLOR} />,
	Purple: <Icon icon="box" className="colorSchemaPurple" style={STYLE_ACTIVE_COLOR} />,
	Orange: <Icon icon="box" className="colorSchemaOrange" style={STYLE_ACTIVE_COLOR} />,
	Red: <Icon icon="box" className="colorSchemaRed" style={STYLE_ACTIVE_COLOR} />,
	Pink: <Icon icon="box" className="colorSchemaPink" style={STYLE_ACTIVE_COLOR} />,
	Green: <Icon icon="box" className="colorSchemaGreen" style={STYLE_ACTIVE_COLOR} />,
	Black: <Icon icon="box" className="colorSchemaBlack" style={STYLE_ACTIVE_COLOR} />,
}
