import { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "sonner";
import {
	Check,
	ChevronsUpDown,
	MapPin,
	Loader2,
	Navigation,
	Search,
	MapPinOff,
	CircleX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	VisuallyHidden,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Control, useController, FieldValues, Path } from "react-hook-form";
import {
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { useLoadScript } from "@react-google-maps/api";

interface PlaceAutocompleteProps<T extends FieldValues> {
	control: Control<T>;
	name: Path<T>;
	label?: string;
}

const libraries: "places"[] = ["places"];

// ── Public wrapper (loads Google Maps script) ─────────────────────────────────

export function PlaceAutocomplete<T extends FieldValues>({
	control,
	name,
	label,
}: PlaceAutocompleteProps<T>) {
	const { isLoaded } = useLoadScript({
		googleMapsApiKey:
			(import.meta.env["VITE_GOOGLE_MAPS_API_KEY"] as string) || "",
		libraries,
	});

	if (!isLoaded) return <div />;

	return <PlaceAutocompleteInner control={control} name={name} label={label} />;
}

// ── Inner component (uses new Places API) ─────────────────────────────────────

type Suggestion = google.maps.places.AutocompleteSuggestion;

function PlaceAutocompleteInner<T extends FieldValues>({
	control,
	name,
	label,
}: PlaceAutocompleteProps<T>) {
	const { field } = useController({ control, name });
	const [open, setOpen] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
	const [isFetching, setIsFetching] = useState(false);
	const [isLoadingLocation, setIsLoadingLocation] = useState(false);
	const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(
		undefined
	);

	// Sync local input when dialog opens
	useEffect(() => {
		if (open) setInputValue(field.value || "");
	}, [open, field.value]);

	// Fetch suggestions using the new AutocompleteSuggestion API
	useEffect(() => {
		clearTimeout(debounceRef.current);

		if (!inputValue || inputValue.length < 2) {
			setSuggestions([]);
			return;
		}

		debounceRef.current = setTimeout(async () => {
			setIsFetching(true);
			try {
				const { AutocompleteSuggestion } = (await google.maps.importLibrary(
					"places"
				)) as google.maps.PlacesLibrary;
				const { suggestions: raw } =
					await AutocompleteSuggestion.fetchAutocompleteSuggestions({
						input: inputValue,
					});
				setSuggestions(raw);
			} catch (err) {
				console.error("[PlaceAutocomplete] Suggestions error:", err);
				setSuggestions([]);
			} finally {
				setIsFetching(false);
			}
		}, 350);

		return () => clearTimeout(debounceRef.current);
	}, [inputValue]);

	const handleSelect = useCallback(
		async (suggestion: Suggestion) => {
			const prediction = suggestion.placePrediction;
			if (!prediction) return;

			try {
				const place = prediction.toPlace();
				await place.fetchFields({
					fields: ["displayName", "formattedAddress", "location"],
				});

				// Prefer "DisplayName, Address" so POIs like "Tokyo DisneySea" are
				// shown by name instead of just a nearby street address.
				const displayName = place.displayName;
				const formattedAddress = place.formattedAddress;

				let address: string;
				if (displayName && formattedAddress) {
					address = `${displayName}, ${formattedAddress}`;
				} else {
					address =
						displayName || formattedAddress || prediction.text.text;
				}

				field.onChange(address);
				setSuggestions([]);
				setInputValue(address);
				setOpen(false);
			} catch (err) {
				console.error("[PlaceAutocomplete] Place detail error:", err);
			}
		},
		[field]
	);

	const handleCurrentLocation = useCallback(() => {
		if (!navigator.geolocation) {
			toast.error("Geolocation is not supported by your browser");
			return;
		}
		setIsLoadingLocation(true);

		const reverseGeocode = async (latitude: number, longitude: number) => {
			try {
				const { Geocoder } = (await google.maps.importLibrary(
					"geocoding"
				)) as google.maps.GeocodingLibrary;
				const geocoder = new Geocoder();
				const { results } = await geocoder.geocode({
					location: { lat: latitude, lng: longitude },
				});
				if (results[0]) {
					const address = results[0].formatted_address;
					field.onChange(address);
					setInputValue(address);
					setOpen(false);
				}
			} catch (err) {
				console.error("[PlaceAutocomplete] Reverse geocode error:", err);
				toast.error("Could not determine your address");
			} finally {
				setIsLoadingLocation(false);
			}
		};

		const onSuccess = (position: GeolocationPosition) => {
			const { latitude, longitude } = position.coords;
			void reverseGeocode(latitude, longitude);
		};

		const onError = (err: GeolocationPositionError) => {
			console.error("[PlaceAutocomplete] Geolocation error:", err);

			// If high-accuracy failed, retry without it as a fallback
			if (err.code === err.POSITION_UNAVAILABLE) {
				navigator.geolocation.getCurrentPosition(
					onSuccess,
					(fallbackErr) => {
						console.error(
							"[PlaceAutocomplete] Geolocation fallback error:",
							fallbackErr
						);
						setIsLoadingLocation(false);
						toast.error(
							"Unable to get your location. Please check your location settings."
						);
					},
					{ timeout: 15000, maximumAge: 300000, enableHighAccuracy: false }
				);
				return;
			}

			setIsLoadingLocation(false);
			if (err.code === err.PERMISSION_DENIED) {
				toast.error("Location permission denied. Please allow location access.");
			} else {
				toast.error("Unable to get your location. Please try again.");
			}
		};

		navigator.geolocation.getCurrentPosition(onSuccess, onError, {
			timeout: 10000,
			maximumAge: 60000,
			enableHighAccuracy: true,
		});
	}, [field]);

	const showEmpty = !inputValue || inputValue.length < 2;
	const showNoResults =
		!isFetching && inputValue.length >= 2 && suggestions.length === 0;

	return (
		<FormItem className="space-y-2">
			{label && (
				<FormLabel className="text-sm font-semibold flex items-center gap-2">
					{label}
				</FormLabel>
			)}
			<div className="relative">
				<div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground z-10 pointer-events-none">
					<MapPin className="size-4" />
				</div>
				<FormControl>
					<Button
						type="button"
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className={cn(
							"w-full h-12 justify-between pl-10 bg-muted/30 border-border/50 text-base font-normal hover:bg-muted/30 hover:text-foreground",
							!field.value && "text-muted-foreground"
						)}
						onClick={() => setOpen(true)}
					>
						<span className="truncate flex-1 text-left">
							{field.value || "Search for a place..."}
						</span>
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</FormControl>
			</div>
			<FormMessage />

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="max-w-[420px] w-[95vw] rounded-[2rem] p-0 border-none bg-transparent shadow-none overflow-visible [&>button]:hidden">
					<VisuallyHidden>
						<DialogTitle>Search for a place</DialogTitle>
					</VisuallyHidden>

					{/* Glassmorphism Container */}
					<div className="bg-card/95 backdrop-blur-3xl border border-white/20 dark:border-white/10 rounded-[2rem] shadow-2xl overflow-hidden relative">
						{/* Decorative Glows */}
						<div className="absolute -top-20 -right-20 size-64 rounded-full blur-[80px] pointer-events-none opacity-40 bg-primary/20" />
						<div className="absolute -bottom-20 -left-20 size-64 rounded-full blur-[80px] pointer-events-none opacity-40 bg-primary/10" />

						<Command
							shouldFilter={false}
							className="bg-transparent [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-14 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"
						>
							<div className="relative border-b border-border/50">
								<CommandInput
									placeholder="Search for a place..."
									value={inputValue}
									onValueChange={setInputValue}
									className="text-base pr-10 bg-transparent"
								/>
								{inputValue && (
									<button
										onClick={() => {
											setInputValue("");
											setSuggestions([]);
										}}
										className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted/50 text-muted-foreground transition-colors"
										type="button"
									>
										<CircleX className="size-5 fill-muted-foreground text-background" />
									</button>
								)}
							</div>

							<CommandList className="max-h-[60vh]">
								{/* Quick Actions */}
								<CommandGroup
									heading="Quick Actions"
									className="text-muted-foreground/70 p-2"
								>
									<CommandItem
										onSelect={handleCurrentLocation}
										className="flex items-center gap-3 py-3 px-3 cursor-pointer aria-selected:bg-primary/10 transition-colors rounded-xl mx-1 my-1"
										disabled={isLoadingLocation}
									>
										<div className="flex items-center justify-center size-10 rounded-full shrink-0 bg-primary/10 text-primary">
											{isLoadingLocation ? (
												<Loader2 className="size-5 animate-spin" />
											) : (
												<Navigation className="size-5 fill-primary/20" />
											)}
										</div>
										<div className="flex flex-col items-start gap-0.5">
											<span className="font-semibold text-primary">
												Use current location
											</span>
											<span className="text-[11px] text-muted-foreground">
												Based on your GPS
											</span>
										</div>
									</CommandItem>
								</CommandGroup>

								<div className="h-px bg-border/50 mx-4 my-1" />

								{/* Loading */}
								{isFetching && (
									<div className="flex items-center justify-center py-8 gap-2 text-muted-foreground">
										<Loader2 className="size-4 animate-spin" />
										<span className="text-sm">Searching...</span>
									</div>
								)}

								{/* Empty state */}
								{showEmpty && !isFetching && (
									<div className="flex flex-col items-center justify-center py-12 gap-3 text-muted-foreground h-48">
										<Search className="size-12 opacity-20" />
										<p className="text-sm font-medium">
											Start typing to search...
										</p>
									</div>
								)}

								{/* No results */}
								{showNoResults && (
									<div className="flex flex-col items-center justify-center py-12 gap-3 text-muted-foreground h-48">
										<MapPinOff className="size-12 opacity-20" />
										<p className="text-sm font-medium">No places found</p>
									</div>
								)}

								{/* Results */}
								{suggestions.length > 0 && !isFetching && (
									<CommandGroup heading="Suggestions" className="pb-2">
										{suggestions.map((s) => {
											const prediction = s.placePrediction;
											if (!prediction) return null;
											const main =
												prediction.mainText?.text ?? prediction.text.text;
											const secondary = prediction.secondaryText?.text ?? "";
											const isSelected =
												!!field.value &&
												(field.value === prediction.text.text ||
													(field.value as string).startsWith(
														prediction.mainText?.text ?? ""
													));

											return (
												<CommandItem
													key={prediction.placeId}
													value={prediction.text.text}
													onSelect={() => handleSelect(s)}
													className="flex items-center gap-3 py-3 px-3 cursor-pointer aria-selected:bg-primary/5 rounded-xl mx-1"
												>
													<div className="flex items-center justify-center size-8 rounded-full bg-muted/50 shrink-0">
														<MapPin className="size-4 text-muted-foreground" />
													</div>
													<div className="flex flex-col min-w-0 flex-1 gap-0.5">
														<span className="font-medium text-foreground truncate text-sm">
															{main}
														</span>
														{secondary && (
															<span className="text-[11px] text-muted-foreground truncate">
																{secondary}
															</span>
														)}
													</div>
													{isSelected && (
														<Check className="ml-2 h-4 w-4 text-primary shrink-0" />
													)}
												</CommandItem>
											);
										})}
									</CommandGroup>
								)}
							</CommandList>
						</Command>
					</div>
				</DialogContent>
			</Dialog>
		</FormItem>
	);
}
