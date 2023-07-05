import { PATHS, axiosClient } from "@/lib";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import AsyncSelect from "react-select/async";
import { ReactComponent as SearchIcon } from "@/assets/images/svg/search.svg";
import { components, ControlProps, OptionProps, StylesConfig } from "react-select";
import { MenuProps } from "react-select";
import { useEffect, useRef, useState } from "react";
import { ActionMeta } from "react-select";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";

type GlobalSelectResponse = {
    data: AsyncSelectOption[];
};

type GlobalSelectRequest = {
    searchString: string;
    maxCount: number;
};

type AsyncSelectOption = {
    id: number;
    name: string;
    ssn: string;
    agreementNumber?: string;
};

type GroupedOption = {
    readonly label: string;
    readonly options: readonly AsyncSelectOption[];
};

type IsMulti = false;

function loadOptions(inputValue: string, callback: (options: AsyncSelectOption[]) => void) {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: "/merchants/search",
        params: {
            searchString: inputValue,
            maxCount: 5,
        },
    };

    axiosClient
        .request<GlobalSelectResponse, AxiosResponse<GlobalSelectResponse, GlobalSelectRequest>, GlobalSelectRequest>(config)
        .then(result => callback(result.data.data))
        .catch(() => callback([]));
}

function CustomControl({ children, ...props }: ControlProps<AsyncSelectOption, false, GroupedOption>) {
    return (
        <components.Control {...props}>
            <SearchIcon className="ml-2" />
            {children}
        </components.Control>
    );
}

function CustomMenu({ children, ...props }: MenuProps<AsyncSelectOption, false, GroupedOption>) {
    return <components.Menu<AsyncSelectOption, false, GroupedOption> {...props}>{children}</components.Menu>;
}

function CustomOption(props: OptionProps<AsyncSelectOption, boolean, GroupedOption>) {
    return (
        <div>
            <components.Option {...props}>
                <label className="option-label">{props.data.name} </label>
            </components.Option>
        </div>
    );
}

const customStyles: StylesConfig<AsyncSelectOption, IsMulti, GroupedOption> = {
    control: provided => ({
        ...provided,
        "&:hover": { borderColor: "#cdd8e2" },
        border: "1px solid #eef0f2",
        boxShadow: "none",
        padding: "0.3rem",
    }),
};

export function GlobalSelect() {
    const [selectedValue, setSelectedValue] = useState<AsyncSelectOption>();
    const navigate = useNavigate();
    const globalSelect = useRef(null);

    function keydownHandler(event: KeyboardEvent) {
        if (event.ctrlKey && event.key === "m") {
            if (globalSelect && globalSelect.current) {
                // todo: find out how to use ts useRef with ReactAsyncSelect. We will ignore it for now
                // @ts-ignore
                globalSelect.current.focus();
            }
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", keydownHandler);

        return () => document.removeEventListener("keydown", keydownHandler);
    }, []);

    useEffect(() => {
        if (selectedValue) {
            navigate(PATHS.MERCHANT.replace(":merchantId", selectedValue.id.toString()));
            // todo: find out how to use ts useRef with ReactAsyncSelect. We will ignore it for now
            // @ts-ignore
            lobalSelect.current.blur();
        }
    }, [selectedValue]);

    return (
        <AsyncSelect
            ref={globalSelect}
            styles={customStyles}
            getOptionLabel={option => option.name}
            getOptionValue={option => option.id.toString()}
            cacheOptions
            loadOptions={debounce(loadOptions, 300)}
            placeholder="Search by name, agreement or SSN"
            value={selectedValue}
            controlShouldRenderValue={false}
            onChange={(option: AsyncSelectOption | null, _: ActionMeta<AsyncSelectOption>) => setSelectedValue(option ?? undefined)}
            components={{
                Control: CustomControl,
                Menu: CustomMenu,
                Option: CustomOption,
                IndicatorSeparator: () => null,
                DropdownIndicator: () => null,
            }}
        />
    );
}
