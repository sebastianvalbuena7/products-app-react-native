import { useNavigation } from "@react-navigation/native";
import { Divider, Layout, TopNavigation, TopNavigationAction, Icon } from '@ui-kitten/components';
import { PropsWithChildren } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MyIcon } from "../components/ui/MyIcon";

interface Props extends PropsWithChildren {
    title: string;
    subTitle: string;

    rightAction?: () => void;
    rightActionIcon?: string;
}

export const MainLayout = ({ children, rightAction, rightActionIcon, subTitle, title }: Props) => {

    const { top } = useSafeAreaInsets();

    const { canGoBack, goBack } = useNavigation();

    const renderBackAction = () => (
        <TopNavigationAction
            icon={<MyIcon name="arrow-back-outline" />}
            onPress={goBack} />
    )

    const RenderRightAction = () => {
        if (rightActionIcon === undefined) return null;

        return (
            <TopNavigationAction
                onPress={rightAction}
                icon={<MyIcon name={rightActionIcon} />}
            />
        )
    }

    return (
        <Layout style={{ paddingTop: top }}>
            <TopNavigation
                title={title}
                subtitle={subTitle}
                alignment="center"
                accessoryLeft={canGoBack() ? renderBackAction : undefined}
                accessoryRight={() => <RenderRightAction />}
            />
            <Divider />

            <Layout style={{ height: '100%' }}>
                {children}
            </Layout>
        </Layout>
    )
}
