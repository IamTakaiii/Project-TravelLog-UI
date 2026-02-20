
import { useState, useEffect } from "react";
import { Check, ChevronsUpDown, MapPin, Loader2, Navigation, Search, MapPinOff, CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Dialog, DialogContent, DialogTitle, VisuallyHidden } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Control, useController, FieldValues, Path } from "react-hook-form";
import { FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import { useLoadScript } from "@react-google-maps/api";

interface PlaceAutocompleteProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label?: string;
}

const libraries: ("places")[] = ["places"];

export function PlaceAutocomplete<T extends FieldValues>({ control, name, label }: PlaceAutocompleteProps<T>) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: (import.meta.env["VITE_GOOGLE_MAPS_API_KEY"] as string) || "",
        libraries,
    });

    if (!isLoaded) return <div>Loading...</div>;

    return <PlaceAutocompleteInner control={control} name={name} label={label} />;
}

function PlaceAutocompleteInner<T extends FieldValues>({ control, name, label }: PlaceAutocompleteProps<T>) {
    const { field } = useController({ control, name });
    const [open, setOpen] = useState(false);

    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            /* Define search scope here */
        },
        debounce: 800,
    });

    // Sync local value with form value ONLY when dialog opens
    useEffect(() => {
        if (open) {
            setValue(field.value || "", false);
        }
    }, [open, field.value, setValue]);

    const handleSelect = async (address: string) => {
        setValue(address, false);
        clearSuggestions();

        try {
            const results = await getGeocode({ address });
            if (results[0]) {
                const { lat, lng } = await getLatLng(results[0]);
                console.log("📍 Coordinates: ", { lat, lng });
            }
            // You can save lat/lng to the form if you update your schema to support it.
        } catch (error) {
            console.error("Error: ", error);
        }

        field.onChange(address);
        setOpen(false);
    };

    const [isLoadingLocation, setIsLoadingLocation] = useState(false);

    const handleCurrentLocation = () => {
        setIsLoadingLocation(true);
        if (!navigator.geolocation) {
            console.error("Geolocation is not supported by your browser");
            setIsLoadingLocation(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const results = await getGeocode({
                        location: { lat: latitude, lng: longitude },
                    });
                    if (results[0]) {
                        const address = results[0].formatted_address;
                        setValue(address, false);
                        field.onChange(address);
                        setOpen(false);
                    }
                } catch (error) {
                    console.error("Error reverse geocoding:", error);
                } finally {
                    setIsLoadingLocation(false);
                }
            },
            (error) => {
                console.error("Error getting location:", error);
                setIsLoadingLocation(false);
            },
            { timeout: 10000, maximumAge: 60000, enableHighAccuracy: true }
        );
    };

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
                        disabled={!ready}
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
                    <VisuallyHidden.Root>
                        <DialogTitle>Search for a place</DialogTitle>
                    </VisuallyHidden.Root>
                    {/* Glassmorphism Container */}
                    <div className="bg-card/95 backdrop-blur-3xl border border-white/20 dark:border-white/10 rounded-[2rem] shadow-2xl overflow-hidden relative">
                        {/* Decorative Glows */}
                        <div className="absolute -top-20 -right-20 size-64 rounded-full blur-[80px] pointer-events-none opacity-40 bg-primary/20" />
                        <div className="absolute -bottom-20 -left-20 size-64 rounded-full blur-[80px] pointer-events-none opacity-40 bg-primary/10" />

                        <Command shouldFilter={false} className="bg-transparent [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-14 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
                            <div className="relative border-b border-border/50">
                                <CommandInput
                                    placeholder="Search for a place..."
                                    value={value}
                                    onValueChange={(val) => setValue(val)}
                                    disabled={!ready}
                                    className="text-base pr-10 bg-transparent"
                                />
                                {value && (
                                    <button
                                        onClick={() => {
                                            setValue("", false);
                                            clearSuggestions();
                                        }}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted/50 text-muted-foreground transition-colors"
                                        type="button"
                                    >
                                        <CircleX className="size-5 fill-muted-foreground text-background" />
                                    </button>
                                )}
                            </div>
                            <CommandList className="max-h-[60vh]">
                                <CommandGroup heading="Quick Actions" className="text-muted-foreground/70 p-2">
                                    <CommandItem
                                        onSelect={handleCurrentLocation}
                                        className="flex items-center gap-3 py-3 px-3 cursor-pointer aria-selected:bg-primary/10 transition-colors rounded-xl mx-1 my-1"
                                        disabled={isLoadingLocation}
                                    >
                                        <div className={cn("flex items-center justify-center size-10 rounded-full shrink-0 transition-colors",
                                            isLoadingLocation ? "bg-primary/10 text-primary" : "bg-primary/10 text-primary"
                                        )}>
                                            {isLoadingLocation ? (
                                                <Loader2 className="size-5 animate-spin" />
                                            ) : (
                                                <Navigation className="size-5 fill-primary/20" />
                                            )}
                                        </div>
                                        <div className="flex flex-col items-start gap-0.5">
                                            <span className="font-semibold text-primary">Use current location</span>
                                            <span className="text-[11px] text-muted-foreground">Based on your GPS</span>
                                        </div>
                                    </CommandItem>
                                </CommandGroup>

                                <div className="h-px bg-border/50 mx-4 my-1" />

                                {!value && (
                                    <div className="flex flex-col items-center justify-center py-12 gap-3 text-muted-foreground h-48">
                                        <Search className="size-12 opacity-20" />
                                        <p className="text-sm font-medium">Start typing to search...</p>
                                    </div>
                                )}

                                {status === "ZERO_RESULTS" && (
                                    <div className="flex flex-col items-center justify-center py-12 gap-3 text-muted-foreground h-48">
                                        <MapPinOff className="size-12 opacity-20" />
                                        <p className="text-sm font-medium">No places found</p>
                                    </div>
                                )}

                                {status === "OK" && data.length > 0 && (
                                    <CommandGroup heading="Suggestions" className="pb-2">
                                        {data.map(({ place_id, description, structured_formatting }) => (
                                            <CommandItem
                                                key={place_id}
                                                value={description}
                                                onSelect={handleSelect}
                                                className="flex items-center gap-3 py-3 px-3 cursor-pointer aria-selected:bg-primary/5 rounded-xl mx-1"
                                            >
                                                <div className="flex items-center justify-center size-8 rounded-full bg-muted/50 shrink-0">
                                                    <MapPin className="size-4 text-muted-foreground" />
                                                </div>
                                                <div className="flex flex-col min-w-0 flex-1 gap-0.5">
                                                    <span className="font-medium text-foreground truncate text-sm">
                                                        {structured_formatting.main_text}
                                                    </span>
                                                    <span className="text-[11px] text-muted-foreground truncate">
                                                        {structured_formatting.secondary_text}
                                                    </span>
                                                </div>
                                                {field.value === description && (
                                                    <Check className="ml-2 h-4 w-4 text-primary shrink-0" />
                                                )}
                                            </CommandItem>
                                        ))}
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
