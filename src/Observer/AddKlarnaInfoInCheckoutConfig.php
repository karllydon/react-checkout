<?php

namespace Hyva\ReactCheckout\Observer;
 
use Exception;
use Magento\Framework\Event\Observer;
use Magento\Framework\Event\ObserverInterface;
use Magento\Framework\Serialize\SerializerInterface;
use Psr\Log\LoggerInterface;
use VaxLtd\KlarnaPos\Model\ConfigProvider;

class AddKlarnaInfoInCheckoutConfig implements ObserverInterface
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
     * @var ConfigProvider
     */
    private $config;

    public function __construct(
        LoggerInterface $logger,
        SerializerInterface $serializer,
        ConfigProvider $config
    ) {
        $this->logger = $logger;
        $this->serializer = $serializer;
        $this->config = $config;
    }

    /**
     * Adding klarna config to checkout config as hyva not providing this by default 
     */
    public function execute(Observer $observer): void
    {
        try {
            $transport = $observer->getTransport();
            $outputData = $transport->getOutput();
            $outputData["payment"]["klarna"] = $this->config->getConfig();
            $transport->setOutput($outputData);
        } catch (Exception $exception) {
            $this->logger->info('Adding klarna config to checkoutConfig failed.', [$exception]);
        }
    }
}
