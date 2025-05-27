<?php

namespace Hyva\ReactCheckout\Observer;
 
use Exception;
use Magento\Framework\Event\Observer;
use Magento\Framework\Event\ObserverInterface;
use Magento\Framework\Serialize\SerializerInterface;
use Psr\Log\LoggerInterface;
use VaxLtd\KlarnaPos\Model\ConfigProvider as KlarnaProvider;
use VaxLtd\NewVoiceMediaPciPalAdyen\Model\ConfigProvider as NvmAdyenProvider;

class AddCustomInfoInCheckoutConfig implements ObserverInterface
{
    /**
     * @var LoggerInterface
     */
    private $logger;

    /**
     * @var SerializerInterface
     */
    private $serializer;

    /**
     * @var KlarnaProvider
     */
    private $klarnaConfig;

    /**
     * @var NvmAdyenProvider
     */
    private $nvmAdyenProvider;

    public function __construct(
        LoggerInterface $logger,
        SerializerInterface $serializer,
        KlarnaProvider $klarnaConfig,
        NvmAdyenProvider $nvmAdyenProvider
    ) {
        $this->logger = $logger;
        $this->serializer = $serializer;
        $this->klarnaConfig = $klarnaConfig;
        $this->nvmAdyenProvider = $nvmAdyenProvider;
    }

    /**
     * Adding custom payments configs to checkout config as hyva not providing this by default 
     */
    public function execute(Observer $observer): void
    {
        try {
            $transport = $observer->getTransport();
            $outputData = $transport->getOutput();
            $outputData["payment"]["klarna"] = $this->klarnaConfig->getConfig();
            $outputData["payment"]["nvmAdyen"] = $this->nvmAdyenProvider->getConfig();
            $transport->setOutput($outputData);
        } catch (Exception $exception) {
            $this->logger->info('Adding klarna config to checkoutConfig failed.', [$exception]);
        }
    }
}
