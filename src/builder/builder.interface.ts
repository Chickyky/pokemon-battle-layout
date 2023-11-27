import { Background } from '@/components';

export interface IBuilder {
	reset(): void;
	setBackground(bg: Background): void;
	setTrainner(): void;
	setPokemon(): void;
	render(): void;
}
